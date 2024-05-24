const machineryType = [
    'Electric', 'Pneumatic', 'Gasoline-powered', 'Manual', 'others'
]


const propertyBudget = [
    '0', '1000', '5000', '10 000', '25 000', '50 000'
]
const constructionBudget = [
    '0', '1000', '5000', '10 000', '25 000', '50 000'
]
const machineryBudget = [
    '0', '1000', '5000', '10 000', '25 000', '50 000'
]
const materialsBudget = [
    '0', '1000', '5000', '10 000', '25 000', '50 000'
]

const machineryBrands = [
    "Caterpillar",
    "Komatsu",
    "Volvo",
    "John-Deere",
    "Hitachi",
    "Liebherr",
    "Bobcat",
    "JCB",
    "Doosan",
    "Kubota",
    "Other"
];

const constructionBrands = [
    'LafargeHolcim',
    'Cemex',
    'HeidelbergCement',
    'CRH plc',
    'Boral',
    'Saint-Gobain',
    'Nippon Steel Corporation',
    'ArcelorMittal',
    'BlueScope Steel',
    'USG Corporation',
    'Georgia-Pacific',
    'James Hardie Industries',
    'Owens Corning',
    'Johns Manville',
    'Knauf',
    'Dow Building Solutions',
    'Sherwin-Williams',
    'Behr',
    'Valspar',
    'PPG Industries',
    'Other'
];

const conditionData = [
    'Excellent', 'Good', 'Fair', 'Poor'
]
const yearBuildData = [
    "Less than 1 year",
    "1 to 3 years",
    "3 to 5 years",
    "5 to 10 years",
    "10 to 15 years",
    "More than 15 years"
];
const propertyYearBuildData = [
    "Under Construction",
    "Less than 1 year",
    "1 to 3 years",
    "3 to 5 years",
    "5 to 10 years",
    "10 to 15 years",
    "More than 15 years"
];

const proximityData = ['School', 'Hospital', 'Super market']
const featuresDataObj = [
    { value: 'Balcony', label: 'Balcony' },
    { value: 'Garden', label: 'Garden' },
    { value: 'Pool', label: 'Pool' },
    { value: 'Elevator', label: 'Elevator' },
    { value: 'Air conditioning', label: 'Air conditioning' },
    { value: 'Heating', label: 'Heating' },
];
const featuresData = ['Balcony', 'Garden', 'Pool', 'Elevator', 'Air conditioning', 'Heating']

const furnitureBrands = [
    "IKEA",
    "H&M Home",
    "BoConcept",
    "Muji",
    "Habitat",
    "John Lewis & Partners",
    "JYSK",
    "Conforama",
    "Maisons du Monde",
    "Natuzzi",
    "DFS",
    "Vitra",
    "B&B Italia",
    "Ligne Roset",
    "Roche Bobois",
    "Cassina",
    "Arper",
    "Flos",
    "Kartell",
    "Minotti"
];

const furnitureTypes = ["Sofa",
    "Bed",
    "Dining Table",
    "Chair",
    "Wardrobe",
    "Desk",
    "Coffee Table",
    "Bookcase",
    "Cabinet",
    "Sideboard",
    "Dresser",
    "Couch",
    "Armchair",
    "Ottoman",
    "Bench",
    "Console Table",
    "Nightstand",
    "TV Stand",
    "Shelf",
    "Filing Cabinet"]

export {
    machineryType,
    propertyBudget,
    constructionBudget,
    machineryBudget,
    materialsBudget,
    yearBuildData,
    propertyYearBuildData,
    conditionData,
    machineryBrands,
    proximityData,
    featuresData,
    featuresDataObj,
    furnitureBrands,
    furnitureTypes,
    constructionBrands
}