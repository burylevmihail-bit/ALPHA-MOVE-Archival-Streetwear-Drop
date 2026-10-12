import { Product } from '../types/store';

// Exact cropped images containing ONLY each respective garment
export const CROP_HOODIE_ONLY = '/src/assets/images/crop_hoodie_only.jpg';
export const CROP_BLACK_JEANS_ONLY = '/src/assets/images/crop_black_jeans_only.jpg';
export const CROP_OLIVE_CARGO_ONLY = '/src/assets/images/crop_olive_cargo_only.jpg';
export const CROP_VINTAGE_BLUE_ONLY = '/src/assets/images/crop_vintage_blue_only.jpg';
export const CROP_CRIMSON_DENIM_ONLY = '/src/assets/images/crop_crimson_denim_only.jpg';

// Studio flat-lay solo shots
export const HOODIE_SOLO = '/src/assets/images/hoodie_crimson_acid_wash_1791821076919.jpg';
export const BLACK_DENIM_SOLO = '/src/assets/images/pants_washed_black_denim_1791821087940.jpg';
export const OLIVE_CARGO_SOLO = '/src/assets/images/pants_olive_cargo_denim_1791821100317.jpg';
export const VINTAGE_BLUE_SOLO = '/src/assets/images/pants_vintage_blue_denim_1791821111877.jpg';

// Full flat-lay compositions for Hero and Lookbook gallery
export const PHOTO_1_OLIVE_CARGO = '/src/assets/images/flatlay_hoodie_olive_cargo_1791822090870.jpg';
export const PHOTO_2_BLACK_DENIM = '/src/assets/images/flatlay_hoodie_black_jeans_1791822101264.jpg';
export const PHOTO_3_VINTAGE_BLUE = '/src/assets/images/flatlay_hoodie_vintage_blue_1791822111140.jpg';
export const PHOTO_4_CRIMSON_DENIM = '/src/assets/images/flatlay_hoodie_crimson_jeans_1791822120422.jpg';
export const PHOTO_5_DENIM_LINEUP = '/src/assets/images/flatlay_three_denim_lineup_1791822130380.jpg';

export const GALLERY_SHOTS = [
  {
    id: 'shot-2',
    title: 'Zip-худи Acid Crimson + Черные Baggy Джинсы',
    image: PHOTO_2_BLACK_DENIM,
    label: 'С черным денимом',
  },
  {
    id: 'shot-1',
    title: 'Zip-худи Acid Crimson + Оливковые Карго',
    image: PHOTO_1_OLIVE_CARGO,
    label: 'С оливковыми карго',
  },
  {
    id: 'shot-3',
    title: 'Zip-худи Acid Crimson + Джинсы Vintage Blue',
    image: PHOTO_3_VINTAGE_BLUE,
    label: 'Со светлым индиго',
  },
  {
    id: 'shot-4',
    title: 'Zip-худи Acid Crimson + Бордовые Джинсы',
    image: PHOTO_4_CRIMSON_DENIM,
    label: 'Бордовый монохром',
  },
  {
    id: 'shot-5',
    title: 'Линейка широких джинсов Alpha Move (3 цвета)',
    image: PHOTO_5_DENIM_LINEUP,
    label: 'Линейка 3 джинсов',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'hoodie-acid-crimson',
    name: 'Zip-худи «Acid Crimson»',
    subtitle: 'Heavyweight Mineral Acid Wash Hoodie (460 GSM)',
    category: 'hoodies',
    price: 3900,
    originalPrice: 4900,
    badge: 'Limited Drop',
    description:
      'Культовое оверсайз зип-худи из сверхплотного 460 GSM хлопка. Каждая единица проходит индивидуальную ручную обработку кислотной минеральной стиркой (Acid Wash), создающую неповторимый винтажный градиент и текстуру потертости. На груди фирменный арочный принт ALPHA MOVE повышенной стойкости, металлический бегунок и аутентичный микродистресс на манжетах.',
    fabricSpecs: {
      density: '460 г/м² (Ultra Heavyweight Terry Cotton)',
      composition: '100% гребенной длинноволокнистый хлопок',
      washType: 'Ручная кислотная энзимная варка (Acid Wash)',
      hardware: 'Усиленная стальная молния с гравированным пуллером',
      fitType: 'Boxy Oversize со спущенной линией плеча',
    },
    details: [
      'Плотный двойной капюшон, отлично держащий форму без шнурков',
      'Глубокий карман-кенгуру с двойной строчкой усиления',
      'Винтажные микродистрессы и потертости на подоле и манжетах',
      'Шелкография водными красками с эффектом кракелюра',
      'Не садится и не деформируется после стирки благодаря предварительной усадке',
    ],
    // Only hoodie in primary picture
    images: [CROP_HOODIE_ONLY, HOODIE_SOLO, PHOTO_2_BLACK_DENIM],
    availableSizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 9 },
      { size: 'L', stock: 12 },
      { size: 'XL', stock: 7 },
      { size: 'XXL', stock: 2 },
    ],
    measurements: {
      S: { length: 66, chest: 60, sleeve: 76 },
      M: { length: 69, chest: 63, sleeve: 78 },
      L: { length: 72, chest: 66, sleeve: 81 },
      XL: { length: 75, chest: 69, sleeve: 83 },
      XXL: { length: 77, chest: 72, sleeve: 85 },
    },
    colorName: 'Acid Crimson Red (Красный винтаж)',
    colorHex: '#991b1b',
  },
  {
    id: 'denim-washed-black',
    name: 'Джинсы «Washed Black Baggy»',
    subtitle: 'Heavy Arch Distressed Wide-Leg Denim (14.5 oz)',
    category: 'denim',
    price: 3500,
    originalPrice: 4500,
    badge: 'Bestseller',
    description:
      'Широкие скейт-джинсы из тяжелого селвидж-денима 14.5 oz. Выстиранный графитово-черный оттенок с естественными заломами на коленях и бедрах. Контрастный белый арочный принт ALPHA MOVE, нанесенный через швы методом сквозной трафаретной печати. Свободный крой с правильным напуском на кроссовки.',
    fabricSpecs: {
      density: '14.5 oz Heavyweight Rigid Cotton Denim',
      composition: '100% премиальный хлопок',
      washType: 'Stone & Mineral Enzyme Wash с ручным фейдингом',
      hardware: 'Металлические болты и заклепки с логотипом',
      fitType: 'Baggy Skate Fit, высокая/средняя посадка',
    },
    details: [
      'Широкий прямой крой штанины от бедра с эффектом puddle hem',
      'Арочный трафаретный принт ALPHA MOVE на бедрах',
      'Классическая пятикарманная конструкция с усиленными углами',
      'Ручные потертости по нижнему краю штанин и карманам',
      'Кожаный фирменный патч на поясе с тиснением',
    ],
    // Only jeans in primary picture
    images: [CROP_BLACK_JEANS_ONLY, BLACK_DENIM_SOLO, PHOTO_5_DENIM_LINEUP],
    availableSizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 14 },
      { size: 'XL', stock: 6 },
      { size: 'XXL', stock: 3 },
    ],
    measurements: {
      S: { waist: 78, outseam: 106, legOpening: 27 },
      M: { waist: 82, outseam: 108, legOpening: 28 },
      L: { waist: 86, outseam: 111, legOpening: 29 },
      XL: { waist: 90, outseam: 113, legOpening: 30 },
      XXL: { waist: 96, outseam: 115, legOpening: 31 },
    },
    colorName: 'Washed Charcoal Black (Выстиранный черный)',
    colorHex: '#27272a',
  },
  {
    id: 'cargo-olive-heavy',
    name: 'Карго «Olive Heavy Ripstop»',
    subtitle: 'Heavy Cotton Twill Cargo Pants with Vertical Print',
    category: 'cargos',
    price: 3500,
    originalPrice: 4500,
    badge: 'Tactical Drop',
    description:
      'Утилитарные брюки карго оливкового цвета из высокопрочного плотного твила. Свободный мешковатый силуэт с вместительными карманами-портфелями на клапанах. По правой штанине расположен вертикальный матовый принт ALPHA MOVE, создающий мощный архитектурный акцент в стритвир-образе.',
    fabricSpecs: {
      density: '380 г/м² Heavy Cotton Twill',
      composition: '100% плотный хлопковый твил',
      washType: 'Garment Dyeing + силиконовое смягчение',
      hardware: 'Матовые военные пуговицы и заклепки',
      fitType: 'Relaxed Wide-Leg Cargo с артикуляцией колен',
    },
    details: [
      'Шесть функциональных карманов (включая глубокие боковые карго-карпаны)',
      'Вертикальный графический принт ALPHA MOVE на правой ноге',
      'Анатомический крой коленной зоны с усиливающей вставкой',
      'Усиленный двойной шов в зоне повышенной нагрузки',
      'Универсальная посадка со шлевками под широкий ремень',
    ],
    // Only cargo in primary picture
    images: [CROP_OLIVE_CARGO_ONLY, OLIVE_CARGO_SOLO],
    availableSizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 5 },
      { size: 'XXL', stock: 1 },
    ],
    measurements: {
      S: { waist: 76, outseam: 105, legOpening: 26 },
      M: { waist: 80, outseam: 107, legOpening: 27 },
      L: { waist: 84, outseam: 110, legOpening: 28 },
      XL: { waist: 88, outseam: 112, legOpening: 29 },
      XXL: { waist: 94, outseam: 114, legOpening: 30 },
    },
    colorName: 'Olive Drab Green (Милитари олива)',
    colorHex: '#4d5d3e',
  },
  {
    id: 'denim-vintage-blue',
    name: 'Джинсы «Vintage Blue Baggy»',
    subtitle: 'Sun-Bleached Distressed Wide Denim (14.0 oz)',
    category: 'denim',
    price: 3500,
    originalPrice: 4500,
    badge: 'Archival Wash',
    description:
      'Аутентичные джинсы в стиле американского гранжа 90-х. Светлый вываренный индиго с эффектом выгорания на солнце (Sun-Bleach) и естественной желтизной в структуре переплетения. Вертикальный глубокий принт ALPHA MOVE по всей длине левой штанины и необработанный бахромчатый низ.',
    fabricSpecs: {
      density: '14.0 oz Vintage Slub Denim',
      composition: '100% премиум хлопковый деним',
      washType: 'Sun-Bleached & Heavy Sandblast варка',
      hardware: 'Состаренная латунь и прорезные карманы',
      fitType: 'Ultra-Wide Baggy со свободной штаниной',
    },
    details: [
      'Массивный вертикальный принт ALPHA MOVE вдоль левой штанины',
      'Эффектная бахрома и необработанный край (Raw Frayed Hem)',
      'Мягкий тяжелый деним со структурным рельефом полотна',
      'Натуральный винтажный градиент без искусственных химических пятен',
      'Идеально сочетается с красным zip-худи из коллекции',
    ],
    // Only blue jeans in primary picture
    images: [CROP_VINTAGE_BLUE_ONLY, VINTAGE_BLUE_SOLO, PHOTO_5_DENIM_LINEUP],
    availableSizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 11 },
      { size: 'L', stock: 9 },
      { size: 'XL', stock: 4 },
      { size: 'XXL', stock: 2 },
    ],
    measurements: {
      S: { waist: 78, outseam: 106, legOpening: 27 },
      M: { waist: 82, outseam: 108, legOpening: 28 },
      L: { waist: 86, outseam: 111, legOpening: 29 },
      XL: { waist: 90, outseam: 113, legOpening: 30 },
      XXL: { waist: 96, outseam: 115, legOpening: 31 },
    },
    colorName: 'Vintage Light Indigo (Вываренный светлый индиго)',
    colorHex: '#64748b',
  },
  {
    id: 'denim-acid-crimson',
    name: 'Джинсы «Acid Crimson Baggy»',
    subtitle: 'Mineral Wash Burgundy Wide-Leg Skate Denim',
    category: 'denim',
    price: 3500,
    originalPrice: 4500,
    badge: 'Rare Drop',
    description:
      'Эксклюзивные широкие джинсы ручной кислотной минеральной варки в тон фирменному худи. Глубокий бордово-красный оттенок с черным вертикальным принтом ALPHA MOVE по всей длине штанины. Тяжелый плотный 14.5 oz хлопковый деним с идеальной драпировкой.',
    fabricSpecs: {
      density: '14.5 oz Mineral Washed Denim',
      composition: '100% премиум хлопок',
      washType: 'Ручная кислотная энзимная стирка (Acid Mineral Wash)',
      hardware: 'Винтажные состаренные пуговицы и заклепки',
      fitType: 'Baggy Skate Fit с широкой штаниной от бедра',
    },
    details: [
      'Вертикальный контрастный принт ALPHA MOVE вдоль левой штанины',
      'Глубокий оттенок бургунди с минеральными кислотными переходами',
      'Усиленные карманы и шлевка под ремень',
      'Прямой широкий крой без заужения к низу',
      'Прекрасно сочетается как с худи Acid Crimson, так и с темными футболками',
    ],
    // Only crimson jeans in primary picture
    images: [CROP_CRIMSON_DENIM_ONLY, PHOTO_5_DENIM_LINEUP],
    availableSizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 5 },
      { size: 'XXL', stock: 2 },
    ],
    measurements: {
      S: { waist: 78, outseam: 106, legOpening: 27 },
      M: { waist: 82, outseam: 108, legOpening: 28 },
      L: { waist: 86, outseam: 111, legOpening: 29 },
      XL: { waist: 90, outseam: 113, legOpening: 30 },
      XXL: { waist: 96, outseam: 115, legOpening: 31 },
    },
    colorName: 'Acid Crimson Denim (Бордовый кислотный)',
    colorHex: '#881337',
  },
];

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Артём К.',
    city: 'Москва',
    rating: 5,
    date: '3 дня назад',
    itemPurchased: 'Zip-худи «Acid Crimson» (Размер L)',
    fitFeedback: 'Рост 184 см, вес 78 кг — сел как влитой, идеальный свободный оверсайз',
    comment:
      'Качество ткани просто пушка! Очень тяжелый плотный хлопок, капюшон стоит без всяких затяжек. Цвет вживую даже глубже, чем на фото — кислотная варка дает крутой градиент на складках. Молния надежная.',
  },
  {
    id: 'rev-2',
    author: 'Даниил М.',
    city: 'Санкт-Петербург',
    rating: 5,
    date: '5 дней назад',
    itemPurchased: 'Джинсы «Washed Black Baggy» (Размер M)',
    fitFeedback: 'Рост 178 см, вес 70 кг — в талии 80 см, длина идеально ложится на сникеры',
    comment:
      'Долго искал именно такой широкий силуэт, чтобы не сужался к низу и красиво драпировался на кроссовках. Принт ALPHA MOVE плотный, не трескается при растяжении. Доставили СДЭКом за 2 дня.',
  },
  {
    id: 'rev-3',
    author: 'Максим В.',
    city: 'Екатеринбург',
    rating: 5,
    date: '1 неделю назад',
    itemPurchased: 'Карго «Olive Heavy Ripstop» (Размер L)',
    fitFeedback: 'Рост 181 см, вес 82 кг — размер L подошел безупречно',
    comment:
      'Карго штаны сделаны из неубиваемого твила, карманы реально объемные. Все спрашивают, где брал. Бренду респект за подход к деталям!',
  },
];
