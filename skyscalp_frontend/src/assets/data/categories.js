// machinery images 
import excavation from '../images/categories/excavation.webp'
import roofingMachine from '../images/categories/roofing machinery.jpg'
import floor from '../images/categories/floor.jpg'
import wall from '../images/categories/wall.jpg'
import foundation from '../images/categories/foundation.png'


// construction images 
import concrete from '../images/categories/concrete.jpg'
import finishing from '../images/categories/finishing.jpg'
import steel from '../images/categories/steel.jpg'
import insulation from '../images/categories/insulation.jpg'
import roofing from '../images/categories/roofing.jpg'
import masonry from '../images/categories/masonry.jpg'
import wood from '../images/categories/wood.jpg'
import others from '../images/categories/others.jpeg'


// homepage images 
import bulldozer from '../images/homepage/bulldozer.webp'
import excavator from '../images/homepage/excavator.webp'
import crusher from '../images/homepage/crusher.jpg'
import compactor from '../images/homepage/compactor.jpeg'
import crane from '../images/homepage/crane.png'
import generator from '../images/homepage/generator.webp'
import roller from '../images/homepage/roller.webp'


import carpet from '../images/homepage/carpet.jpg'
import sink from '../images/homepage/sink.png'
import aluminium from '../images/homepage/aluminium.jpg'
import lamp from '../images/homepage/lamp.webp'
import paint from '../images/homepage/paint.jpg'
import concreteHome from '../images/homepage/concrete.webp'
import glass from '../images/homepage/glass.jpg'

import sofa from '../images/homepage/sofa.jpg'
import vacuume from '../images/homepage/vacuume.jpg'
import diningTable from '../images/homepage/diningTable.png'
import bathroomCabinet from '../images/homepage/bathroomCabinet.jpg'
import bed from '../images/homepage/bed.jpg'
import officeDesk from '../images/homepage/officeDesk.jpg'
import armchair from '../images/homepage/armchair.jpg'


const machineryCategories = [
    {
        id: 1,
        image: foundation,
        categoryName: 'Earthmoving',
        subcategories: [
            'Bulldozer', 'Wheel loader', 'Backhoe loader', 'Excavator', 'Scraper', 'Grader', 'Compactor', 'Roller', 'Trencher', 'Skid-steer loader', 'Other'
        ]
    },
    {
        id: 2,
        image: wall,
        categoryName: 'Lifting',
        subcategories: [
            'Crane', 'Aerial work platform', 'Forklift', 'Telehandler', 'Cherry picker',
            'Hoist', 'Winch', 'Boom lift', 'Scissor lift', 'Pallet jack', 'Other'
        ]
    },
    {
        id: 3,
        image: floor,
        categoryName: 'Compaction',
        subcategories: [
            'Compactor', 'Roller', 'Rammer', 'Plate compactor', 'Vibratory compactor',
            'Pneumatic roller', 'Soil compactor', 'Asphalt compactor', 'Hand tamper',
            'Reversible plate compactor', 'Other'
        ]
    },
    {
        id: 4,
        image: roofing,
        categoryName: 'Demolition',
        subcategories: [
            'Crusher', 'Shear', 'Demolition hammer', 'Excavator', 'Breaker',
            'Wrecking ball', 'Demolition saw', 'Hydraulic breaker', 'Pneumatic hammer',
            'Demolition excavator', 'Other'
        ]
    },
    {
        id: 5,
        image: excavation,
        categoryName: 'Other',
        subcategories: [
            'Generator', 'Pump', 'Welder', 'Compressor', 'Light tower',
            'Saw', 'Drill', 'Grinder', 'Concrete mixer', 'Concrete pump', 'Other'
        ]
    }
];
const propertyCategories = [
    {
        id: 1,
        categoryName: 'Land',
        subcategories: [
            'Residential',
            'Commercial',
            'Industrial',
            'Agricultural',
            'Vacant'
        ]
    },
    {
        id: 2,
        categoryName: 'Buildings',
        subcategories: [
            'Residential',
            'Commercial',
            'Industrial',
            'Mixed-use',
            'Institutional (e.g., schools, hospitals)',
            'Apartments'
        ]
    },
    {
        id: 3,
        categoryName: 'Infrastructure',
        subcategories: [
            'Roads and highways',
            'Bridges',
            'Tunnels',
            'Utilities (e.g., water, electricity)',
            'Railways'
        ]
    },
    {
        id: 4,
        categoryName: 'Real Estate Development',
        subcategories: [
            'Residential subdivisions',
            'Commercial complexes',
            'Industrial parks',
            'Mixed-use developments',
            'Redevelopment projects'
        ]
    },
    {
        id: 5,
        categoryName: 'Natural Resources',
        subcategories: [
            'Mineral rights',
            'Timber rights',
            'Water rights',
            'Oil and gas rights',
            'Conservation easements'
        ]
    },
    {
        id: 6,
        image: others,
        categoryName: "Other",
        subcategories: []
    }
];
// const constructionCategories = [
//     {
//         id: 1,
//         categoryName: 'Concrete Materials',
//         image: concrete,
//         subcategories: [
//             'Cement',
//             'Concrete mix',
//             'Reinforcing steel bars (rebar)',
//             'Concrete blocks',
//             'Precast concrete elements'
//         ]
//     },
//     {
//         id: 2,
//         categoryName: 'Steel and Metal',
//         image: steel,
//         subcategories: [
//             'Structural steel beams',
//             'Steel bars',
//             'Metal roofing materials',
//             'Sheet metal',
//             'Steel pipes'
//         ]
//     },
//     {
//         id: 3,
//         categoryName: 'Wood and Timber',
//         image: wood,
//         subcategories: [
//             'Lumber',
//             'Plywood',
//             'Wood studs',
//             'Timber beams',
//             'Wood panels'
//         ]
//     },
//     {
//         id: 4,
//         categoryName: 'Masonry Materials',
//         image: masonry,
//         subcategories: [
//             'Bricks',
//             'Clay tiles',
//             'Mortar',
//             'Concrete blocks',
//             'Stone veneer'
//         ]
//     },
//     {
//         id: 5,
//         categoryName: 'Roofing Materials',
//         image: roofing,
//         subcategories: [
//             'Asphalt shingles',
//             'Metal roofing panels',
//             'Roofing membranes',
//             'Roof tiles',
//             'Underlayment materials'
//         ]
//     },
//     {
//         id: 6,
//         categoryName: 'Insulation and Sealants',
//         image: insulation,
//         subcategories: [
//             'Fiberglass insulation',
//             'Spray foam insulation',
//             'Foam board insulation',
//             'Sealant caulk',
//             'Weatherstripping'
//         ]
//     },
//     {
//         id: 7,
//         categoryName: 'Finishing Materials',
//         image: finishing,
//         subcategories: [
//             'Paints and coatings',
//             'Drywall panels',
//             'Flooring materials',
//             'Tiles',
//             'Trim and molding'
//         ]
//     },
//     {
//         id: 8,
//         image: Other,
//         categoryName: "Others",
//         subcategories: []
//     }
// ];
const constructionCategories = [
    {
        id: 1,
        image: "foundation",
        categoryName: "Foundation",
        subcategories: ["Concrete", "Masonry", "Steel", "Wood"]
    },
    {
        id: 2,
        image: "wall",
        categoryName: "Construction of walls and posts",
        subcategories: ["Concrete", "Masonry", "Steel", "Wood", "Insulation", "Drywall", "Paint", "Caulking"]
    },
    {
        id: 3,
        image: "floor",
        categoryName: "Installation of slabs and floors",
        subcategories: ["Tile", "Stone"]
    },
    {
        id: 4,
        image: "roofing",
        categoryName: "Frame and roofing",
        subcategories: ["Asphalt Shingles", "Metal Roofing", "Tile Roofing", "Shingle Siding"]
    },
    {
        id: 5,
        image: "excavation",
        categoryName: "Earthworks and excavation work",
        subcategories: ["Soil", "Rock", "Sand", "Gravel"]
    },
    {
        id: 6,
        image: "Other",
        categoryName: "Other",
        subcategories: []
    }
];

const furnitureCategories = [
    {
        id: 1,
        categoryName: 'Seating',
        image: wood,
        subcategories: [
            'Sofas',
            'Chairs',
            'Recliners',
            'Benches',
            'Stools'
        ]
    },
    {
        id: 2,
        categoryName: 'Tables',
        image: wood,
        subcategories: [
            'Dining tables',
            'Coffee tables',
            'Side tables',
            'Console tables',
            'Desk tables'
        ]
    },
    {
        id: 3,
        categoryName: 'Storage',
        image: wood,
        subcategories: [
            'Cabinets',
            'Shelves',
            'Wardrobes',
            'Drawers',
            'Bookcases'
        ]
    },
    {
        id: 4,
        categoryName: 'Beds',
        image: wood,
        subcategories: [
            'Single beds',
            'Double beds',
            'Queen beds',
            'King beds',
            'Bunk beds'
        ]
    },
    {
        id: 5,
        categoryName: 'Desks',
        image: wood,
        subcategories: [
            'Writing desks',
            'Computer desks',
            'Executive desks',
            'Standing desks',
            'Corner desks'
        ]
    },
    {
        id: 6,
        categoryName: 'Outdoor Furniture',
        image: wood,
        subcategories: [
            'Patio sets',
            'Garden benches',
            'Outdoor tables',
            'Deck chairs',
            'Hammocks'
        ]
    },
    {
        id: 7,
        categoryName: 'Accent Furniture',
        image: wood,
        subcategories: [
            'Accent chairs',
            'Sideboards',
            'End tables',
            'Ottomans',
            'Console cabinets'
        ]
    },
    {
        id: 8,
        categoryName: 'Kids Furniture',
        image: wood,
        subcategories: [
            'Kids beds',
            'Kids tables',
            'Kids chairs',
            'Toy storage',
            'Kids desks'
        ]
    },
    {
        id: 9,
        image: others,
        categoryName: "Other",
        subcategories: []
    }
];

const marketplaceCategories = [
    {
        id: 1,
        name: "machineryTools",
        image: excavation
    },
    {
        id: 2,
        name: "buildingMaterial",
        image: concrete
    },
    {
        id: 3,
        name: "furnitureAppliances",
        image: wood
    },
]

const machineryHomeCategories = [
    {
        id: 1,
        name: 'Bulldozer',
        image: bulldozer
    },
    {
        id: 2,
        name: 'Excavator',
        image: excavator
    },
    {
        id: 3,
        name: 'Roller',
        image: roller
    },
    {
        id: 4,
        name: 'Crane',
        image: crane
    },
    {
        id: 5,
        name: 'Compactor',
        image: compactor
    },
    {
        id: 6,
        name: 'Crusher',
        image: crusher
    },
    {
        id: 7,
        name: 'Generator',
        image: generator
    },
    
]

const materialsHomeCategories = [
    {
        id: 1,
        name: 'Concrete',
        image: concreteHome
    },
    {
        id: 2,
        name: 'Glass',
        image: glass
    },
    {
        id: 3,
        name: 'Paint',
        image: paint
    },
    {
        id: 4,
        name: 'Lamp',
        image: lamp
    },
    {
        id: 5,
        name: 'Sink',
        image: sink
    },
    {
        id: 6,
        name: 'Carpet',
        image: carpet
    },
    {
        id: 7,
        name: 'Aluminum',
        image: aluminium
    },
    
]


const furnitureHomeCategories = [
    {
        id: 1,
        name: 'Sofa',
        image: sofa
    },
    {
        id: 2,
        name: 'Armchair',
        image: armchair
    },
    {
        id: 3,
        name: 'Bed',
        image: bed
    },
    {
        id: 4,
        name: 'Kitchen Table',
        image: diningTable
    },
    {
        id: 5,
        name: 'Bathroom Cabinet',
        image: bathroomCabinet
    },
    {
        id: 6,
        name: 'Desk',
        image: officeDesk
    },
    {
        id: 7,
        name: 'Vacuum Cleaner',
        image: vacuume
    },
    
]

export { materialsHomeCategories, machineryHomeCategories, machineryCategories, propertyCategories, constructionCategories, furnitureCategories, marketplaceCategories, furnitureHomeCategories }