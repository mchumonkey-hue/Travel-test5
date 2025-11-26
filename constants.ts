import { DaySchedule } from './types';

export const ITINERARY_DATA: DaySchedule[] = [
  {
    date: '2024-12-03',
    displayDate: '12/3',
    weekday: 'Tuesday',
    location: 'Bangkok City',
    items: [
      { id: '1', time: '00:00', title: '抵達曼谷市區', location: 'Bangkok', type: 'transport', description: '抵達並辦理入住', mapQuery: 'Bangkok City Center' },
      { id: '2', time: '14:00', title: '藍色觀光船遊河', location: 'Sathorn Pier', type: 'sightseeing', description: '前往大皇宮、玉佛寺、臥佛寺', mapQuery: 'Sathorn Pier' },
      { id: '3', time: '15:00', title: '大皇宮 & 玉佛寺', location: 'The Grand Palace', type: 'sightseeing', description: '參觀泰國皇室建築與玉佛', mapQuery: 'The Grand Palace' },
      { id: '4', time: '16:00', title: '臥佛寺', location: 'Wat Pho', type: 'sightseeing', description: '參觀著名的巨大臥佛', mapQuery: 'Wat Pho' },
      { id: '5', time: '17:00', title: '鄭王廟夜景', location: 'Wat Arun', type: 'sightseeing', description: '欣賞昭披耶河畔夕陽與夜景', mapQuery: 'Wat Arun' },
      { id: '6', time: '20:00', title: 'Talat Phlu Food Market', location: 'Talat Phlu', type: 'food', description: '搭乘 MRT 前往享用道地晚餐', mapQuery: 'Talat Phlu Market' },
    ]
  },
  {
    date: '2024-12-04',
    displayDate: '12/4',
    weekday: 'Wednesday',
    location: 'Ayutthaya',
    items: [
      { id: '7', time: '09:00', title: '前往大城', location: 'Bangkok Bus Terminal', type: 'transport', description: '搭乘 Mini Van 前往大城', mapQuery: 'Bangkok Bus Terminal Chatuchak' },
      { id: '8', time: '11:00', title: '瑪哈泰寺', location: 'Wat Mahathat', type: 'sightseeing', description: '樹中佛頭奇景', mapQuery: 'Wat Mahathat Ayutthaya' },
      { id: '9', time: '13:00', title: '柴瓦塔那蘭寺', location: 'Wat Chaiwatthanaram', type: 'sightseeing', description: '保存完整的高棉風格佛塔', mapQuery: 'Wat Chaiwatthanaram' },
      { id: '10', time: '14:30', title: '帕司三碧寺', location: 'Wat Phra Si Sanphet', type: 'sightseeing', description: '大城皇宮遺址', mapQuery: 'Wat Phra Si Sanphet' },
      { id: '11', time: '15:30', title: '拉嘉布拉那寺', location: 'Wat Ratchaburana', type: 'sightseeing', description: '參觀主塔與地宮', mapQuery: 'Wat Ratchaburana' },
      { id: '12', time: '17:00', title: '返程 & 夜市', location: 'Ayutthaya Station', type: 'transport', description: '搭火車至廊曼機場站，轉 Grab 去 Save One Go 夜市', mapQuery: 'Save One Go Market' },
    ]
  },
  {
    date: '2024-12-05',
    displayDate: '12/5',
    weekday: 'Thursday',
    location: 'Kanchanaburi',
    items: [
      { id: '13', time: '09:00', title: '大象保育體驗', location: 'Somboon Legacy Foundation', type: 'activity', description: '包車前往 Hands-Off Elephant Sanctuary', mapQuery: 'Somboon Legacy Foundation' },
      { id: '14', time: '12:00', title: '園區午餐 & 互動', location: 'Somboon Legacy Foundation', type: 'food', description: '享用午餐並觀察大象自然生態', mapQuery: 'Somboon Legacy Foundation' },
    ]
  },
  {
    date: '2024-12-06',
    displayDate: '12/6',
    weekday: 'Friday',
    location: 'Amphawa',
    items: [
      { id: '15', time: '08:00', title: '丹嫩莎多水上市場', location: 'Damnoen Saduak', type: 'sightseeing', description: '包車體驗傳統手搖船', mapQuery: 'Damnoen Saduak Floating Market' },
      { id: '16', time: '11:00', title: '美功鐵道市場', location: 'Maeklong Railway Market', type: 'sightseeing', description: '觀看火車穿過市場的奇景', mapQuery: 'Maeklong Railway Market' },
      { id: '17', time: '14:00', title: '安帕瓦水上市場', location: 'Amphawa Floating Market', type: 'sightseeing', description: '悠閒逛河岸市集', mapQuery: 'Amphawa Floating Market' },
    ]
  },
  {
    date: '2024-12-07',
    displayDate: '12/7',
    weekday: 'Saturday',
    location: 'Samut Prakan',
    items: [
      { id: '18', time: '10:00', title: '暹羅古城', location: 'Ancient City', type: 'sightseeing', description: 'BTS前往，參觀泰國縮影博物館', mapQuery: 'The Ancient City' },
      { id: '19', time: '17:00', title: '希娜克琳火車夜市', location: 'Srinakarin Train Market', type: 'food', description: 'Grab 叫車前往復古夜市', mapQuery: 'Srinakarin Train Night Market' },
    ]
  },
  {
    date: '2024-12-08',
    displayDate: '12/8',
    weekday: 'Sunday',
    location: 'Bangkok',
    items: [
      { id: '20', time: '11:00', title: '吞武里海鮮市場', location: 'Thonburi Market Place', type: 'food', description: 'Grab 前往享用海鮮大餐', mapQuery: 'Thonburi Market Place' },
      { id: '21', time: '14:00', title: 'Big C 採買', location: 'Big C Rajdamri', type: 'activity', description: '購買伴手禮', mapQuery: 'Big C Supercenter Rajdamri' },
      { id: '22', time: '18:00', title: 'Bhawa Spa', location: 'Bhawa Spa', type: 'relax', description: '18:00 - 21:00 放鬆按摩行程', mapQuery: 'Bhawa Spa on the Eight' },
    ]
  },
];
