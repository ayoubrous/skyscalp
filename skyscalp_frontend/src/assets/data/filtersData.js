const machineryType = [
    'Electric', 'Pneumatic', 'Gasoline', 'Manual', 'others'
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
    '0', '1000', '3000', '8000', '15 000', '30 000'
]

const machineryBrands = [
    {
        id: 1,
        application: "Earthmoving",
        brands: [
            'Caterpillar', 'Komatsu', 'Volvo', 'JCB', 'Hyundai', 'Doosan',
            'Liebherr', 'New Holland', 'Kubota', 'Manitou', 'Other'
        ]
    },
    {
        id: 2,
        application: "Lifting",
        brands: [
            'Terex', 'Genie', 'JLG', 'Manitou', 'Konecranes', 'Liebherr',
            'Potain', 'Grove', 'Tadano', 'Palfinger', 'Other'
        ]
    },
    {
        id: 3,
        application: "Compaction",
        brands: [
            'Caterpillar', 'Komatsu', 'Volvo', 'JCB', 'Hamm', 'Ammann',
            'Dynapac', 'Bomag', 'Wirtgen', 'Sakai', 'Other'
        ]
    },
    {
        id: 4,
        application: "Demolition",
        brands: [
            'Caterpillar', 'Komatsu', 'Hitachi', 'Volvo', 'JCB', 'Hyundai',
            'Doosan', 'Liebherr', 'New Holland', 'Atlas Copco', 'Other'
        ]
    },
    {
        id: 5,
        application: "Others",
        brands: [
            'Caterpillar', 'Cummins', 'Perkins', 'Atlas Copco', 'Ingersoll-Rand',
            'Generac', 'Honda', 'Makita', 'Bosch', 'DeWalt', 'Other'
        ]
    }
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
const machineConditionData = [
    'New', 'Used', 'To Repair'
]
const furnitureConditionData = [
    'New', 'Used'
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
    "Local",
    "Conforama",
    "Maisons du Monde",
    "Roche Bobois",
    "Leroy Merlin",
    "Habitat",
    "But",
    "Darty",
    "Boulanger",
    "Alinéa",
    "La Redoute Intérieurs",
    "Fly",
    "Others"
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

const machineryGuarantee = [
    "Less than 1 month",
    "1 to 6 months",
    "6 to 12 months",
    "1 to 3 years",
    "More than 3 years"
]

export {
    machineryType,
    furnitureConditionData,
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
    constructionBrands,
    machineryGuarantee,
    machineConditionData
}