

import lawyer from '../images/experts/lawyer.png'
import construction from '../images/experts/construction.png'
import realEstate from '../images/experts/realEstate.png'
import finance from '../images/experts/finance.png'
import designer from '../images/experts/designer.png'
import servicesExpert from '../images/experts/services.png'
import craft from '../images/experts/craft.png'
let servicesList = [
    {
        name: "Legal",
        services: [
            {
                serviceName: "Notary",
                specialization: ['Acts', 'Successions', 'Donations', 'Other'],
                expertise: ['Sale', 'Purchase', 'Succession', 'Other'],
                focusArea: ['Inheritance', 'Donation', 'Will', 'Other']
            },
            {
                serviceName: "Lawyer",
                specialization: ['Contracts', 'Litigation', 'Negotiation', 'Other'],
                expertise: ['Defense', 'Prosecution', 'Investigation', 'Other'],
                focusArea: ['Contracts', 'Litigation', 'Negotiation', 'Other']
            },
            {
                serviceName: "Taxation",
                specialization: ['Taxes', 'VAT', 'Wealth Tax', 'Other'],
                expertise: ['Reductions', 'Credits', 'Deductions', 'Other'],
                focusArea: ['Income', 'Wealth', 'Corporate', 'Other']
            },
            {
                serviceName: "Legal Advice",
                specialization: ['Contracts', 'Litigation', 'Negotiation', 'Other'],
                expertise: ['Leases', 'Transactions', 'Litigation', 'Other'],
                focusArea: ['Contracts', 'Litigation', 'Negotiation', 'Other']
            }
        ]
    },
    {
        name: "Construction",
        services: [
            {
                serviceName: "Architect",
                specialization: ['Plans', 'Models', 'Permits', 'Other'],
                expertise: ['2D', '3D', 'Technical', 'Other'],
                focusArea: ['Urban Planning', 'Construction', 'Renovation', 'Other']
            },
            {
                serviceName: "Civil Engineer",
                specialization: ['Concrete', 'Steel', 'Wood', 'Other'],
                expertise: ['Sustainable', 'Innovative', 'Traditional', 'Other'],
                focusArea: ['Standards', 'Regulations', 'Compliance', 'Other']
            },
            {
                serviceName: "Design Office",
                specialization: ['Structures', 'Materials', 'Energy', 'Other'],
                expertise: ['Thermal', 'Acoustic', 'Lighting', 'Other'],
                focusArea: ['Compliance', 'Other']
            },
            {
                serviceName: "Real Estate Developer",
                specialization: ['Residential', 'Commercial', 'Industrial', 'Other'],
                expertise: ['Bank', 'Private', 'Public', 'Other'],
                focusArea: ['Sale', 'Lease', 'Promotion', 'Other']
            },
            {
                serviceName: "Renovation Company",
                specialization: ['Interior', 'Exterior', 'Complete', 'Other'],
                expertise: ['Eco-friendly', 'Sustainable', 'Innovative', 'Other'],
                focusArea: ['Less than $10k', '$10k-$50k', 'More than $50k', 'Other']
            },
            {
                serviceName: "Construction Manager",
                specialization: ['Projects', 'Teams', 'Budget', 'Other'],
                expertise: ['Residential', 'Commercial', 'Industrial', 'Other'],
                focusArea: ['Workers', 'Technicians', 'Engineers', 'Other']
            },
            {
                serviceName: "Surveyor",
                specialization: ['Topography', 'Geometry', 'Cartography', 'Other'],
                expertise: ['2D', '3D', 'Technical', 'Other'],
                focusArea: ['Urban Planning', 'Construction', 'Renovation', 'Other']
            }
        ]
    },
    {
        name: "Financing",
        services: [
            {
                serviceName: "Mortgage",
                specialization: ['Less than 2%', '2%-3%', '3.5%-4%', '4%-4.5%', 'More than 4.5%', 'Other'],
                expertise: ['Less than 10 years', '10-15 years', '15-20 years', '20-25 years', 'More than 25 years', 'Other'],
                focusArea: ['Fixed', 'Variable', 'Mixed', 'Other']
            },
            {
                serviceName: "Insurance",
                specialization: ['Fire', 'Theft', 'Water Damage', 'Other'],
                expertise: ['Partial', 'Full', 'Custom', 'Other'],
                focusArea: ['Monthly', 'Annual', 'One-time', 'Other']
            },
            {
                serviceName: "Financial Advisor",
                specialization: ['Stocks', 'Bonds', 'Real Estate', 'Other'],
                expertise: ['Savings', 'Investment', 'Retirement', 'Other'],
                focusArea: ['Wealth', 'Succession', 'Taxation', 'Other']
            },
            {
                serviceName: "Loan Broker",
                specialization: ['Less than 2%', '2%-3%', '3.5%-4%', '4%-4.5%', 'More than 4.5%', 'Other'],
                expertise: ['Less than 10 years', '10-15 years', '15-20 years', '20-25 years', 'More than 25 years', 'Other'],
                focusArea: ['Fixed', 'Variable', 'Mixed', 'Other']
            }
        ]
    },
    {
        name: "Interior Design",
        services: [
            {
                serviceName: "Interior Architect",
                specialization: ['Plans', 'Models', '3D', 'Other'],
                expertise: ['2D', '3D', 'Technical', 'Other'],
                focusArea: ['Contemporary', 'Classic', 'Modern', 'Other']
            },
            {
                serviceName: "Decorator",
                specialization: ['Contemporary', 'Classic', 'Modern', 'Other'],
                expertise: ['Warm', 'Cool', 'Neutral', 'Other'],
                focusArea: ['Design', 'Vintage', 'Modern', 'Other']
            },
            {
                serviceName: "Design Company",
                specialization: ['Plans', 'Models', '3D', 'Other'],
                expertise: ['Contemporary', 'Classic', 'Modern', 'Other'],
                focusArea: ['Minimalist', 'Eclectic', 'Industrial', 'Other']
            }
        ]
    },
    {
        name: "Services",
        services: [
            {
                serviceName: "Moving",
                specialization: ['Local', 'National', 'International', 'Other'],
                expertise: ['Truck', 'Container', 'Personal Vehicle', 'Other'],
                focusArea: ['Packing', 'Unpacking', 'Storage', 'Other']
            },
            {
                serviceName: "Cleaning",
                specialization: ['Residential', 'Commercial', 'Industrial', 'Other'],
                expertise: ['Regular', 'Occasional', 'Deep', 'Other'],
                focusArea: ['Sanitary', 'Food', 'General', 'Other']
            },
            {
                serviceName: "Security",
                specialization: ['Physical', 'Electronic', 'Cyber', 'Other'],
                expertise: ['Cameras', 'Alarms', 'Guarding', 'Other'],
                focusArea: ['People', 'Property', 'Data', 'Other']
            },
            {
                serviceName: "Co-ownership Syndicate",
                specialization: ['Administrative', 'Financial', 'Technical', 'Other'],
                expertise: ['General', 'Extraordinary', 'Special', 'Other'],
                focusArea: ['Co-ownership', 'Urban Planning', 'Security', 'Other']
            },
            {
                serviceName: "Concierge",
                specialization: ['Reception', 'Assistance', 'Management', 'Other'],
                expertise: ['Technical', 'Administrative', 'Personal', 'Other'],
                focusArea: ['Mail', 'Deliveries', 'Maintenance', 'Other']
            },
            {
                serviceName: "Property Management",
                specialization: ['Rental', 'Technical', 'Administrative', 'Other'],
                expertise: ['Regular', 'Occasional', 'Deep', 'Other'],
                focusArea: ['Short-term', 'Long-term', 'Seasonal', 'Other']
            }
        ]
    },
    {
        name: "Real Estate",
        services: [
            {
                serviceName: "Real Estate Agent",
                specialization: ['Apartments', 'Houses', 'Land', 'Other'],
                expertise: ['Apartments', 'Houses', 'Land', 'Other'],
                focusArea: ['Apartments', 'Houses', 'Offices', 'Other']
            },
            {
                serviceName: "Real Estate Advisor",
                specialization: ['Residential', 'Commercial', 'Industrial', 'Other'],
                expertise: ['Purchase', 'Sale', 'Lease', 'Other'],
                focusArea: ['Market', 'Property', 'Project', 'Other']
            }
        ]
    },
    {
        name: "Works",
        services: [
            {
                serviceName: "Plumbing",
                specialization: ['Sanitary', 'Heating', 'Water', 'Other'],
                expertise: ['Leaks', 'Clogs', 'Replacement', 'Other'],
                focusArea: ['Maintenance', 'Inspection', 'Replacement', 'Other']
            },
            {
                serviceName: "Electricity",
                specialization: ['Lighting', 'Outlets', 'Wiring', 'Other'],
                expertise: ['Failures', 'Short Circuits', 'Replacement', 'Other'],
                focusArea: ['Maintenance', 'Inspection', 'Replacement', 'Other']
            },
            {
                serviceName: "Heating/Air Conditioning",
                specialization: ['Heating', 'Air Conditioning', 'Ventilation', 'Other'],
                expertise: ['Failures', 'Leaks', 'Replacement', 'Other'],
                focusArea: ['Maintenance', 'Inspection', 'Replacement', 'Other']
            },
            {
                serviceName: "Tiler",
                specialization: ['Tiles', 'Ceramics', 'Mosaic', 'Other'],
                expertise: ['Cracks', 'Replacement', 'Cleaning', 'Other'],
                focusArea: ['Maintenance', 'Inspection', 'Replacement', 'Other']
            },
            {
                serviceName: "Painter",
                specialization: ['Interior', 'Exterior', 'Decorative', 'Other'],
                expertise: ['Cracks', 'Stains', 'Replacement', 'Other'],
                focusArea: ['Maintenance', 'Inspection', 'Replacement', 'Other']
            },
            {
                serviceName: "Carpenter",
                specialization: ['Furniture', 'Structures', 'Decoration', 'Other'],
                expertise: ['Cracks', 'Replacement', 'Cleaning', 'Other'],
                focusArea: ['Maintenance', 'Inspection', 'Replacement', 'Other']
            },
            {
                serviceName: "Glazier",
                specialization: ['Windows', 'Storefronts', 'Mirrors', 'Other'],
                expertise: ['Cracks', 'Replacement', 'Cleaning', 'Other'],
                focusArea: ['Maintenance', 'Inspection', 'Replacement', 'Other']
            },
            {
                serviceName: "Other",
                specialization: ['Other'],
                expertise: ['Other'],
                focusArea: ['Other']
            }
        ]
    }
];

let services = [
    {
        id: 1,
        image: lawyer,
        field: "Legal",
        expertise: [
            {
                expertyName: "Notary",
                filter1: {
                    filterName: "Notarial Law",
                    options: ["Acts", "Successions", "Donations", "Other"]
                },
                filter2: {
                    filterName: "Notarial Acts",
                    options: ["Sale", "Purchase", "Succession", "Other"]
                },
                filter3: {
                    filterName: "Successions",
                    options: ["Inheritance", "Donation", "Will", "Other"]
                }
            },
            {
                expertyName: "Lawyer",
                filter1: {
                    filterName: "Civil Law",
                    options: ["Contracts", "Litigation", "Negotiation", "Other"]
                },
                filter2: {
                    filterName: "Criminal Law",
                    options: ["Defense", "Prosecution", "Investigation", "Other"]
                },
                filter3: {
                    filterName: "Commercial Law",
                    options: ["Contracts", "Litigation", "Negotiation", "Other"]
                }
            },
            {
                expertyName: "Tax Advisor",
                filter1: {
                    filterName: "Taxation",
                    options: ["Taxes", "VAT", "Wealth Tax", "Other"]
                },
                filter2: {
                    filterName: "Optimization",
                    options: ["Reductions", "Credits", "Deductions", "Other"]
                },
                filter3: {
                    filterName: "Declarations",
                    options: ["Income", "Wealth", "Corporate", "Other"]
                }
            },
            {
                expertyName: "Legal Advisor",
                filter1: {
                    filterName: "Legal Advice",
                    options: ["Contracts", "Litigation", "Negotiation", "Other"]
                },
                filter2: {
                    filterName: "Real Estate Law",
                    options: ["Leases", "Transactions", "Litigation", "Other"]
                },
                filter3: {
                    filterName: "Labor Law",
                    options: ["Contracts", "Litigation", "Negotiation", "Other"]
                }
            },
        ]
    },
    {
        id: 2,
        image: construction,
        field: "Construction",
        expertise: [
            {
                expertyName: "Architect",
                filter1: {
                    filterName: "Design",
                    options: ["Plans", "Models", "Permits", "Other"]
                },
                filter2: {
                    filterName: "Plans",
                    options: ["2D", "3D", "Technical", "Other"]
                },
                filter3: {
                    filterName: "Permits",
                    options: ["Urban Planning", "Construction", "Renovation", "Other"]
                }
            },
            {
                expertyName: "Civil Engineer",
                filter1: {
                    filterName: "Structures",
                    options: ["Concrete", "Steel", "Wood", "Other"]
                },
                filter2: {
                    filterName: "Materials",
                    options: ["Sustainable", "Innovative", "Traditional", "Other"]
                },
                filter3: {
                    filterName: "Safety",
                    options: ["Standards", "Regulations", "Compliance", "Other"]
                }
            },
            {
                expertyName: "Design Office",
                filter1: {
                    filterName: "Studies",
                    options: ["Structures", "Materials", "Energy", "Other"]
                },
                filter2: {
                    filterName: "Analyses",
                    options: ["Thermal", "Acoustic", "Lighting", "Other"]
                }
            },
            {
                expertyName: "Real Estate Developer",
                filter1: {
                    filterName: "Projects",
                    options: ["Residential", "Commercial", "Industrial", "Other"]
                },
                filter2: {
                    filterName: "Financing",
                    options: ["Bank", "Private", "Public", "Other"]
                },
                filter3: {
                    filterName: "Commercialization",
                    options: ["Sale", "Lease", "Promotion", "Other"]
                }
            },
            {
                expertyName: "Renovation Company",
                filter1: {
                    filterName: "Renovation",
                    options: ["Interior", "Exterior", "Complete", "Other"]
                },
                filter2: {
                    filterName: "Materials",
                    options: ["Eco-friendly", "Sustainable", "Innovative", "Other"]
                }
            },
            {
                expertyName: "Construction Manager",
                filter1: {
                    filterName: "Management",
                    options: ["Projects", "Teams", "Budget", "Other"]
                },
                filter2: {
                    filterName: "Projects",
                    options: ["Residential", "Commercial", "Industrial", "Other"]
                },
                filter3: {
                    filterName: "Teams",
                    options: ["Workers", "Technicians", "Engineers", "Other"]
                }
            },
            {
                expertyName: "Surveyor",
                filter1: {
                    filterName: "Measurements",
                    options: ["Topography", "Geometry", "Cartography", "Other"]
                },
                filter2: {
                    filterName: "Plans",
                    options: ["2D", "3D", "Technical", "Other"]
                },
                filter3: {
                    filterName: "Topography",
                    options: ["Urban Planning", "Construction", "Renovation", "Other"]
                }
            },

        ]
    },
    {
        id: 3,
        image: finance,
        field: "Financing",
        expertise: [
            {
                expertyName: "Mortgage",
                filter1: {
                    filterName: "Rate",
                    options: ["Less than 2%", "2%-3%", "3.5%-4%", "4%-4.5%", "More than 4.5%", "Other"]
                },
                filter2: {
                    filterName: "Duration",
                    options: ["Less than 10 years", "10-15 years", "15-20 years", "20-25 years", "More than 25 years", "Other"]
                },
                filter3: {
                    filterName: "Conditions",
                    options: ["Fixed", "Variable", "Mixed", "Other"]
                }
            },
            {
                expertyName: "Insurance",
                filter1: {
                    filterName: "Category",
                    options: ["Fire", "Theft", "Water Damage", "Other"]
                },
                filter2: {
                    filterName: "Coverage",
                    options: ["Partial", "Full", "Custom", "Other"]
                },
                filter3: {
                    filterName: "Premiums",
                    options: ["Monthly", "Annual", "One-time", "Other"]
                }
            },
            {
                expertyName: "Financial Advisor",
                filter1: {
                    filterName: "Investments",
                    options: ["Stocks", "Bonds", "Real Estate", "Other"]
                },
                filter2: {
                    filterName: "Advice",
                    options: ["Savings", "Investment", "Retirement", "Other"]
                },
                filter3: {
                    filterName: "Planning",
                    options: ["Wealth", "Succession", "Taxation", "Other"]
                }
            },
            {
                expertyName: "Loan Broker",
                filter1: {
                    filterName: "Rate",
                    options: ["Less than 2%", "2%-3%", "3.5%-4%", "4%-4.5%", "More than 4.5%", "Other"]
                },
                filter2: {
                    filterName: "Duration",
                    options: ["Less than 10 years", "10-15 years", "15-20 years", "20-25 years", "More than 25 years", "Other"]
                },
                filter3: {
                    filterName: "Conditions",
                    options: ["Fixed", "Variable", "Mixed", "Other"]
                }
            }
        ]
    },


    {
        id: 4,
        image: designer,
        field: "Interior Design",
        expertise: [
            {
                expertyName: "Interior Architect",
                filter1: {
                    filterName: "Design",
                    options: ["Plans", "Models", "3D", "Other"]
                },
                filter2: {
                    filterName: "Plans",
                    options: ["2D", "3D", "Technical", "Other"]
                },
                filter3: {
                    filterName: "Layout",
                    options: ["Contemporary", "Classic", "Modern", "Other"]
                }
            },
            {
                expertyName: "Decorator",
                filter1: {
                    filterName: "Style",
                    options: ["Contemporary", "Classic", "Modern", "Other"]
                },
                filter2: {
                    filterName: "Colors",
                    options: ["Warm", "Cool", "Neutral", "Other"]
                },
                filter3: {
                    filterName: "Furniture",
                    options: ["Traditional", "Vintage", "Modern", "Other"]
                }
            },
            {
                expertyName: "Design Company",
                filter1: {
                    filterName: "Design",
                    options: ["Plans", "Models", "3D", "Other"]
                },
                filter2: {
                    filterName: "Layout",
                    options: ["Contemporary", "Classic", "Modern", "Other"]
                },
                filter3: {
                    filterName: "Decoration",
                    options: ["Minimalist", "Eclectic", "Industrial", "Other"]
                }
            },
        ]
    },
    {
        id: 5,
        image: servicesExpert,
        field: "Services",
        expertise: [
            {
                expertyName: "Moving",
                filter1: {
                    filterName: "Moving",
                    options: ["Local", "National", "International", "Other"]
                },
                filter2: {
                    filterName: "Transport",
                    options: ["Truck", "Container", "Personal Vehicle", "Other"]
                },
                filter3: {
                    filterName: "Logistics",
                    options: ["Packing", "Unpacking", "Storage", "Other"]
                }
            },
            {
                expertyName: "Cleaning",
                filter1: {
                    filterName: "Cleaning",
                    options: ["Residential", "Commercial", "Industrial", "Other"]
                },
                filter2: {
                    filterName: "Maintenance",
                    options: ["Regular", "Occasional", "Deep", "Other"]
                },
                filter3: null // No third filter specified
            },
            {
                expertyName: "Security",
                filter1: {
                    filterName: "Security",
                    options: ["Physical", "Electronic", "Cyber", "Other"]
                },
                filter2: {
                    filterName: "Surveillance",
                    options: ["Cameras", "Alarms", "Guarding", "Other"]
                },
                filter3: {
                    filterName: "Protection",
                    options: ["People", "Property", "Data", "Other"]
                }
            },
            {
                expertyName: "Co-ownership Syndicate",
                filter1: {
                    filterName: "Management",
                    options: ["Administrative", "Financial", "Technical", "Other"]
                },
                filter2: {
                    filterName: "Meetings",
                    options: ["General", "Extraordinary", "Special", "Other"]
                },
                filter3: {
                    filterName: "Regulations",
                    options: ["Co-ownership", "Urban Planning", "Security", "Other"]
                }
            },
            {
                expertyName: "Concierge",
                filter1: {
                    filterName: "Services",
                    options: ["Reception", "Assistance", "Management", "Other"]
                },
                filter2: {
                    filterName: "Assistance",
                    options: ["Technical", "Administrative", "Personal", "Other"]
                },
                filter3: {
                    filterName: "Management",
                    options: ["Mail", "Deliveries", "Maintenance", "Other"]
                }
            },
            {
                expertyName: "Property Management",
                filter1: {
                    filterName: "Management",
                    options: ["Rental", "Technical", "Administrative", "Other"]
                },
                filter2: {
                    filterName: "Maintenance",
                    options: ["Regular", "Occasional", "Deep", "Other"]
                },
                filter3: {
                    filterName: "Lease",
                    options: ["Short-term", "Long-term", "Seasonal", "Other"]
                }
            },
        ]
    },
    {
        id: 6,
        image: realEstate,
        field: "Real Estate",
        expertise: [
            {
                expertyName: "Real Estate Agent",
                filter1: {
                    filterName: "Sale",
                    options: ["Apartments", "Houses", "Land", "Other"]
                },
                filter2: {
                    filterName: "Purchase",
                    options: ["Apartments", "Houses", "Land", "Other"]
                },
                filter3: {
                    filterName: "Lease",
                    options: ["Apartments", "Houses", "Offices", "Other"]
                }
            },
            {
                expertyName: "Real Estate Advisor",
                filter1: {
                    filterName: "Investments",
                    options: ["Residential", "Commercial", "Industrial", "Other"]
                },
                filter2: {
                    filterName: "Advice",
                    options: ["Purchase", "Sale", "Lease", "Other"]
                },
                filter3: {
                    filterName: "Evaluation",
                    options: ["Market", "Property", "Project", "Other"]
                }
            },
        ]
    },
    {
        id: 7,
        image: craft,
        field: "Crafts",
        expertise: [
            {
                expertyName: "Plumbing",
                filter1: {
                    filterName: "Installation",
                    options: ["Sanitary", "Heating", "Water", "Other"]
                },
                filter2: {
                    filterName: "Repair",
                    options: ["Leaks", "Clogs", "Replacement", "Other"]
                },
                filter3: {
                    filterName: "Maintenance",
                    options: ["Maintenance", "Inspection", "Replacement", "Other"]
                }
            },
            {
                expertyName: "Electricity",
                filter1: {
                    filterName: "Installation",
                    options: ["Lighting", "Outlets", "Wiring", "Other"]
                },
                filter2: {
                    filterName: "Repair",
                    options: ["Failures", "Short Circuits", "Replacement", "Other"]
                },
                filter3: {
                    filterName: "Maintenance",
                    options: ["Maintenance", "Inspection", "Replacement", "Other"]
                }
            },
            {
                expertyName: "Heating/Air Conditioning",
                filter1: {
                    filterName: "Installation",
                    options: ["Heating", "Air Conditioning", "Ventilation", "Other"]
                },
                filter2: {
                    filterName: "Repair",
                    options: ["Failures", "Leaks", "Replacement", "Other"]
                },
                filter3: {
                    filterName: "Maintenance",
                    options: ["Maintenance", "Inspection", "Replacement", "Other"]
                }
            },
            {
                expertyName: "Tiler",
                filter1: {
                    filterName: "Installation",
                    options: ["Tiles", "Ceramics", "Mosaic", "Other"]
                },
                filter2: {
                    filterName: "Repair",
                    options: ["Cracks", "Replacement", "Cleaning", "Other"]
                },
                filter3: {
                    filterName: "Maintenance",
                    options: ["Maintenance", "Inspection", "Replacement", "Other"]
                }
            },
            {
                expertyName: "Painter",
                filter1: {
                    filterName: "Painting",
                    options: ["Interior", "Exterior", "Decorative", "Other"]
                },
                filter2: {
                    filterName: "Repair",
                    options: ["Cracks", "Stains", "Replacement", "Other"]
                },
                filter3: {
                    filterName: "Maintenance",
                    options: ["Maintenance", "Inspection", "Replacement", "Other"]
                }
            },
            {
                expertyName: "Carpenter",
                filter1: {
                    filterName: "Fabrication",
                    options: ["Furniture", "Structures", "Decoration", "Other"]
                },
                filter2: {
                    filterName: "Repair",
                    options: ["Cracks", "Replacement", "Cleaning", "Other"]
                },
                filter3: {
                    filterName: "Maintenance",
                    options: ["Maintenance", "Inspection", "Replacement", "Other"]
                }
            },
            {
                expertyName: "Glazier",
                filter1: {
                    filterName: "Installation",
                    options: ["Windows", "Storefronts", "Mirrors", "Other"]
                },
                filter2: {
                    filterName: "Repair",
                    options: ["Cracks", "Replacement", "Cleaning", "Other"]
                },
                filter3: {
                    filterName: "Maintenance",
                    options: ["Maintenance", "Inspection", "Replacement", "Other"]
                }
            },
        ]
    }
];


let educationData = [
    "Less than Bac", "Bac", "Bac +2", "Bac +3", "Bac +4", "Bac +5", "Bac +6", "Bac +8", "Other"
]

let languageData = [
    "French", "English", "Arabic", "Other"
]

let availibilityData = [
    "Morning", "Afternoon", "Evening", "Weekend", "Other"
]

let experienceList = [
    '1 to 3 years', '3 to 5 years', '5 to 10 years', 'more than 10 years'
]

let experienceData = [
    {
        label: "1 to 3 years",
        value: "1-3"
    },
    {
        label: "3 to 5 years",
        value: "3-5"
    },
    {
        label: "5 to 10 years",
        value: "5-10"
    },
    {
        label: "more than 10 years",
        value: "10-100"
    },
]

let serviceFeesData = [
    '0', '100', '500', '1000', '2000', '5000', '10000'
]


const servicesHomeCategories = [
    {
        id: 1,
        name: 'Notary',
        image: lawyer
    },
    {
        id: 2,
        name: 'Architect',
        image: construction
    },
    {
        id: 3,
        name: 'Mortgage',
        image: finance
    },
    {
        id: 4,
        name: 'Interior Architect',
        image: designer
    },
    {
        id: 5,
        name: 'Moving',
        image: servicesExpert
    },
    {
        id: 6,
        name: 'Real Estate Agent',
        image: realEstate
    },
    {
        id: 7,
        name: 'Plumbing',
        image: craft
    },
    
]
export { services, educationData, languageData, availibilityData, experienceList, experienceData, serviceFeesData, servicesHomeCategories }