import React, { useState, useMemo } from 'react';
import { Expense } from '../types';
import { Plus, X, Wallet, TrendingUp, PieChart, Trash2 } from 'lucide-react';

interface ExpenseTrackerProps {
  expenses: Expense[];
  onAdd: (expense: Expense) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ expenses, onAdd, onDelete, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('list');
  const [formData, setFormData] = useState<Partial<Expense>>({
    currency: 'THB',
    payer: 'A',
    category: 'Food'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;
    
    onAdd({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: Number(formData.amount),
      currency: formData.currency as 'TWD' | 'THB',
      payer: formData.payer as 'A' | 'B',
      category: formData.category || 'Misc',
      description: formData.description,
    });
    setFormData({ currency: 'THB', payer: 'A', category: 'Food', amount: undefined, description: '' });
    setActiveTab('list');
  };

  const summary = useMemo(() => {
    const totalTHB = expenses.filter(e => e.currency === 'THB').reduce((acc, curr) => acc + curr.amount, 0);
    const totalTWD = expenses.filter(e => e.currency === 'TWD').reduce((acc, curr) => acc + curr.amount, 0);
    
    const paidByA_THB = expenses.filter(e => e.payer === 'A' && e.currency === 'THB').reduce((acc, curr) => acc + curr.amount, 0);
    const paidByB_THB = expenses.filter(e => e.payer === 'B' && e.currency === 'THB').reduce((acc, curr) => acc + curr.amount, 0);
    
    // Simple logic: split everything 50/50. 
    // If A paid 1000, B owes 500. If B paid 0, A is owed 500.
    // Net: (PaidByA - PaidByB) / 2 = Amount B owes A.
    const netDiffTHB = (paidByA_THB - paidByB_THB) / 2;

    return { totalTHB, totalTWD, netDiffTHB };
  }, [expenses]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-thai-silk w-full sm:w-[400px] h-[85vh] sm:h-auto rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        
        {/* Header */}
        <div className="bg-thai-purple text-white p-4 flex justify-between items-center shrink-0">
          <h2 className="text-xl font-serif flex items-center gap-2">
            <Wallet className="text-thai-gold" /> Travel Wallet
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full"><X /></button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 gap-2 bg-gray-100 shrink-0">
            <button 
                onClick={() => setActiveTab('list')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'list' ? 'bg-white shadow-sm text-thai-purple' : 'text-gray-500'}`}
            >
                Overview
            </button>
            <button 
                onClick={() => setActiveTab('add')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'add' ? 'bg-white shadow-sm text-thai-purple' : 'text-gray-500'}`}
            >
                Add Expense
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'list' ? (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-sm">
                            <span className="text-xs opacity-80 uppercase">Total Spent (THB)</span>
                            <div className="text-2xl font-bold">฿{summary.totalTHB.toLocaleString()}</div>
                        </div>
                         <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-sm">
                            <span className="text-xs opacity-80 uppercase">Total Spent (TWD)</span>
                            <div className="text-2xl font-bold">${summary.totalTWD.toLocaleString()}</div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><PieChart className="w-4 h-4"/> Settlement</h3>
                        <p className="text-sm text-gray-600 mb-1">Assuming 50/50 split for all items.</p>
                        <div className="text-lg font-medium text-thai-purple">
                            {summary.netDiffTHB > 0 
                                ? `B owes A: ฿${summary.netDiffTHB.toLocaleString()}` 
                                : `A owes B: ฿${Math.abs(summary.netDiffTHB).toLocaleString()}`}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">*Calculated on THB expenses only</p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-700">Recent Transactions</h3>
                        {expenses.length === 0 && <p className="text-gray-400 text-center py-4">No expenses yet.</p>}
                        {expenses.slice().reverse().map(exp => (
                            <div key={exp.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                                <div>
                                    <div className="font-medium text-gray-800">{exp.description}</div>
                                    <div className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()} • {exp.category} • Paid by {exp.payer}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-gray-700">{exp.currency === 'THB' ? '฿' : '$'}{exp.amount}</span>
                                    <button onClick={() => onDelete(exp.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Item Description</label>
                        <input required type="text" className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-thai-gold outline-none" placeholder="e.g. Pad Thai Lunch" 
                        value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                            <input required type="number" className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-thai-gold outline-none" placeholder="0.00"
                            value={formData.amount || ''} onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})} />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                             <select className="w-full p-3 rounded-xl border border-gray-200 bg-white" 
                                value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value as any})}>
                                <option value="THB">THB (฿)</option>
                                <option value="TWD">TWD ($)</option>
                             </select>
                        </div>
                    </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                             <select className="w-full p-3 rounded-xl border border-gray-200 bg-white"
                                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Ticket">Ticket</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Misc">Misc</option>
                             </select>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Paid By</label>
                             <div className="flex bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <button type="button" onClick={() => setFormData({...formData, payer: 'A'})} className={`flex-1 py-3 font-medium transition ${formData.payer === 'A' ? 'bg-thai-purple text-white' : 'text-gray-500'}`}>A</button>
                                <button type="button" onClick={() => setFormData({...formData, payer: 'B'})} className={`flex-1 py-3 font-medium transition ${formData.payer === 'B' ? 'bg-thai-purple text-white' : 'text-gray-500'}`}>B</button>
                             </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-thai-gold text-white font-bold py-4 rounded-xl shadow-lg hover:bg-yellow-600 transition-colors mt-6 flex items-center justify-center gap-2">
                        <Plus className="w-5 h-5" /> Add Transaction
                    </button>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
