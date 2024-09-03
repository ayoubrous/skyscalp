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