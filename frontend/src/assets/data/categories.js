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


const machineryCategories = [
    {
        id: 1,
        image: foundation,
        categoryName: 'Foundation',
        subcategories: [
            'Excavator shovel',
            'Dump truck',
            'Cement mixer',
            'Vibrator',
            'Formwork'
        ]
    },
    {
        id: 2,
        image: wall,
        categoryName: 'Construction of walls and posts',
        subcategories: [
            'Crane',
            'Cherry picker',
            'Concrete blocks or concrete blocks',
            'Mortar',
            'Coatings'
        ]
    },
    {
        id: 3,
        image: floor,
        categoryName: 'Installation of slabs and floors',
        subcategories: [
            'Steel or concrete beams',
            'Collaborative floors',
            'Float'
        ]
    },
    {
        id: 4,
        image: roofing,
        categoryName: 'Frame and roofing',
        subcategories: [
            'Lumber',
            'Tiles or slates',
            'Scaffolding',
            'Carpenter tools',
            'Miter saw'
        ]
    },
    {
        id: 5,
        image: excavation,
        categoryName: 'Earthworks and excavation work',
        subcategories: [
            'Bulldozer',
            'Compactor',
            'Level'
        ]
    },
    {
        id: 6,
        image: others,
        categoryName: 'Others',
        subcategories: []
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
        categoryName: "Others",
        subcategories: []
    }
];
const constructionCategories = [
    {
        id: 1,
        categoryName: 'Concrete Materials',
        image: concrete,
        subcategories: [
            'Cement',
            'Concrete mix',
            'Reinforcing steel bars (rebar)',
            'Concrete blocks',
            'Precast concrete elements'
        ]
    },
    {
        id: 2,
        categoryName: 'Steel and Metal',
        image: steel,
        subcategories: [
            'Structural steel beams',
            'Steel bars',
            'Metal roofing materials',
            'Sheet metal',
            'Steel pipes'
        ]
    },
    {
        id: 3,
        categoryName: 'Wood and Timber',
        image: wood,
        subcategories: [
            'Lumber',
            'Plywood',
            'Wood studs',
            'Timber beams',
            'Wood panels'
        ]
    },
    {
        id: 4,
        categoryName: 'Masonry Materials',
        image: masonry,
        subcategories: [
            'Bricks',
            'Clay tiles',
            'Mortar',
            'Concrete blocks',
            'Stone veneer'
        ]
    },
    {
        id: 5,
        categoryName: 'Roofing Materials',
        image: roofing,
        subcategories: [
            'Asphalt shingles',
            'Metal roofing panels',
            'Roofing membranes',
            'Roof tiles',
            'Underlayment materials'
        ]
    },
    {
        id: 6,
        categoryName: 'Insulation and Sealants',
        image: insulation,
        subcategories: [
            'Fiberglass insulation',
            'Spray foam insulation',
            'Foam board insulation',
            'Sealant caulk',
            'Weatherstripping'
        ]
    },
    {
        id: 7,
        categoryName: 'Finishing Materials',
        image: finishing,
        subcategories: [
            'Paints and coatings',
            'Drywall panels',
            'Flooring materials',
            'Tiles',
            'Trim and molding'
        ]
    },
    {
        id: 8,
        image: others,
        categoryName: "Others",
        subcategories: []
    }
];

export { machineryCategories, propertyCategories, constructionCategories }