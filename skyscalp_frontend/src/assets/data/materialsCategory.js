// let OLDmaterialCategories = [
//     {
//         id: 1,
//         application: "Structural Work",
//         ignoreProperties: ['voltage', 'material', 'style', 'base'],
//         categories: [
//             {
//                 materialName: 'Concrete',
//                 unit: "m³",
//                 types: ['Ready-Mix', 'Precast', 'On-Site', 'Other']
//             },
//             {
//                 materialName: 'Cement',
//                 unit: "kg",
//                 types: ['Portland', 'Blended', 'Slag', 'Other']
//             },
//             {
//                 materialName: 'Sand',
//                 unit: "m³",
//                 types: ['River', 'Beach', 'Quarry', 'Other']
//             },
//             {
//                 materialName: 'Gravel',
//                 unit: "m³",
//                 types: ['Crushed', 'Natural', 'Recycled', 'Other']
//             },
//             {
//                 materialName: 'Stone',
//                 unit: "m²",
//                 types: ['Granite', 'Marble', 'Limestone', 'Other']
//             },
//             {
//                 materialName: 'Brick',
//                 unit: "piece",
//                 types: ['Clay', 'Concrete', 'Other']
//             },
//             {
//                 materialName: 'Concrete Block',
//                 unit: "piece",
//                 types: ['Hollow', 'Solid', 'Other']
//             }
//         ]
//     },
//     {
//         id: 2,
//         application: "Secondary Work",
//         ignoreProperties: ['voltage', 'style', 'material', 'base'],
//         categories: [
//             {
//                 materialName: 'Timber for Framing',
//                 unit: "m³",
//                 types: ['Softwood', 'Hardwood', 'Other']
//             },
//             {
//                 materialName: 'Wood for Joinery',
//                 unit: "m²",
//                 types: ['Oak', 'Pine', 'Other']
//             },
//             {
//                 materialName: 'Metal for Framing',
//                 unit: "kg",
//                 types: ['Steel', 'Aluminum', 'Other']
//             },
//             {
//                 materialName: 'Metal for Joinery',
//                 unit: "kg",
//                 types: ['Brass', 'Copper', 'Other']
//             },
//             {
//                 materialName: 'Glass',
//                 unit: "m²",
//                 types: ['Tempered', 'Laminated', 'Other']
//             },
//             {
//                 materialName: 'Aluminum',
//                 unit: "kg",
//                 types: ['Extruded', 'Cast', 'Other']
//             },
//             {
//                 materialName: 'PVC',
//                 unit: "m²",
//                 types: []
//             }
//         ]
//     },
//     {
//         id: 3,
//         application: "Finishing",
//         ignoreProperties: ['voltage', 'style', 'base'],
//         categories: [
//             {
//                 materialName: 'Paint',
//                 unit: "L",
//                 types: ['Acrylic', 'Oil-Based', 'Other']
//             },
//             {
//                 materialName: 'Varnish',
//                 unit: "L",
//                 types: ['Polyurethane', 'Shellac', 'Other']
//             },
//             {
//                 materialName: 'Lacquer',
//                 unit: "L",
//                 types: ['Nitrocellulose', 'Polyurethane', 'Other']
//             },
//             {
//                 materialName: 'Wallpaper',
//                 unit: "m²",
//                 types: ['Vinyl', 'Paper', 'Other']
//             },
//             {
//                 materialName: 'Tile',
//                 unit: "m²",
//                 types: ['Ceramic', 'Porcelain', 'Other']
//             },
//             {
//                 materialName: 'Parquet',
//                 unit: "m²",
//                 types: ['Oak', 'Maple', 'Other']
//             },
//             {
//                 materialName: 'Carpet',
//                 unit: "m²",
//                 types: ['Wool', 'Synthetic', 'Other']
//             }
//         ]
//     },
//     {
//         id: 4,
//         application: "Insulation",
//         ignoreProperties: ['voltage', 'size', 'color', 'style', 'material', 'finish', 'base'],
//         categories: [
//             {
//                 materialName: 'Glass Wool',
//                 unit: "m²",
//                 types: ['Blown', 'Batt', 'Other']
//             },
//             {
//                 materialName: 'Rock Wool',
//                 unit: "m²",
//                 types: ['Blown', 'Batt', 'Other']
//             },
//             {
//                 materialName: 'Polyurethane Foam',
//                 unit: "m²",
//                 types: ['Spray', 'Board', 'Other']
//             },
//             {
//                 materialName: 'Polyisocyanurate Foam',
//                 unit: "m²",
//                 types: ['Board', 'Other']
//             },
//             {
//                 materialName: 'Wood Fiber',
//                 unit: "m²",
//                 types: ['Board', 'Other']
//             },
//             {
//                 materialName: 'Bamboo Fiber',
//                 unit: "m²",
//                 types: ['Board', 'Other']
//             },
//             {
//                 materialName: 'Hemp Fiber',
//                 unit: "m²",
//                 types: ['Board', 'Other']
//             }
//         ]
//     },
//     {
//         id: 5,
//         application: "Electricity",
//         ignoreProperties: ['thickness', 'material', 'base', 'finish'],
//         categories: [
//             {
//                 materialName: 'Electrical Cable',
//                 unit: "m",
//                 types: ['Copper', 'Aluminum', 'Other']
//             },
//             {
//                 materialName: 'Power Outlet',
//                 unit: "piece",
//                 types: ['Standard', 'GFCI', 'Other']
//             },
//             {
//                 materialName: 'Light Switch',
//                 unit: "piece",
//                 types: ['Toggle', 'Dimmer', 'Other']
//             },
//             {
//                 materialName: 'Electrical Plug',
//                 unit: "piece",
//                 types: ['2-Prong', '3-Prong', 'Other']
//             },
//             {
//                 materialName: 'Lamp',
//                 unit: "piece",
//                 types: ['Incandescent', 'LED', 'Other']
//             },
//             {
//                 materialName: 'Light Bulb',
//                 unit: "piece",
//                 types: ['Incandescent', 'LED', 'Other']
//             },
//             {
//                 materialName: 'LED Lighting',
//                 unit: "piece",
//                 types: ['Strip', 'Bulb', 'Other']
//             }
//         ]
//     },
//     {
//         id: 6,
//         application: "Plumbing",
//         ignoreProperties: ['voltage', 'material', 'voltage'],
//         categories: [
//             {
//                 materialName: 'Copper Pipe',
//                 unit: "m",
//                 types: ['Type L', 'Type K', 'Other']
//             },
//             {
//                 materialName: 'PVC Pipe',
//                 unit: "m",
//                 types: ['Schedule 40', 'Schedule 80', 'Other']
//             },
//             {
//                 materialName: 'PE Pipe',
//                 unit: "m",
//                 types: ['HDPE', 'LDPE', 'Other']
//             },
//             {
//                 materialName: 'Faucet',
//                 unit: "piece",
//                 types: ['Single Handle', 'Double Handle', 'Other']
//             },
//             {
//                 materialName: 'Sink',
//                 unit: "piece",
//                 types: ['Single Bowl', 'Double Bowl', 'Other']
//             },
//             {
//                 materialName: 'Bathtub',
//                 unit: "piece",
//                 types: ['Freestanding', 'Built-in', 'Other']
//             },
//             {
//                 materialName: 'Shower',
//                 unit: "piece",
//                 types: ['Wall-Mounted', 'Ceiling-Mounted', 'Other']
//             }
//         ]
//     },
//     {
//         id: 7,
//         application: "Heating",
//         ignoreProperties: ['voltage'],
//         categories: [
//             {
//                 materialName: 'Gas Boiler',
//                 unit: "piece",
//                 types: ['Condensing', 'Non-Condensing', 'Other']
//             },
//             {
//                 materialName: 'Oil Boiler',
//                 unit: "piece",
//                 types: ['Condensing', 'Non-Condensing', 'Other']
//             },
//             {
//                 materialName: 'Wood Boiler',
//                 unit: "piece",
//                 types: ['Condensing', 'Non-Condensing', 'Other']
//             },
//             {
//                 materialName: 'Coal Boiler',
//                 unit: "piece",
//                 types: ['Condensing', 'Non-Condensing', 'Other']
//             },
//             {
//                 materialName: 'Cast Iron Radiator',
//                 unit: "piece",
//                 types: ['Wall-Mounted', 'Floor-Mounted', 'Other']
//             },
//             {
//                 materialName: 'Steel Radiator',
//                 unit: "piece",
//                 types: ['Wall-Mounted', 'Floor-Mounted', 'Other']
//             },
//             {
//                 materialName: 'Aluminum Radiator',
//                 unit: "piece",
//                 types: ['Wall-Mounted', 'Floor-Mounted', 'Other']
//             }
//         ]
//     },
//     {
//         id: 8,
//         application: "Decoration",
//         ignoreProperties: ['voltage'],
//         categories: [
//             {
//                 materialName: 'Wooden Furniture',
//                 unit: "piece",
//                 types: ['Chair', 'Table', 'Other']
//             },
//             {
//                 materialName: 'Metal Furniture',
//                 unit: "piece",
//                 types: ['Chair', 'Table', 'Other']
//             },
//             {
//                 materialName: 'Glass Furniture',
//                 unit: "piece",
//                 types: ['Table', 'Shelf', 'Other']
//             },
//             {
//                 materialName: 'Wall Covering',
//                 unit: "m²",
//                 types: ['Wallpaper', 'Paint', 'Other']
//             },
//             {
//                 materialName: 'Wallpaper',
//                 unit: "m²",
//                 types: ['Vinyl', 'Paper', 'Other']
//             },
//             {
//                 materialName: 'Paint',
//                 unit: "L",
//                 types: ['Acrylic', 'Oil-Based', 'Other']
//             },
//             {
//                 materialName: 'Varnish',
//                 unit: "L",
//                 types: ['Polyurethane', 'Shellac', 'Other']
//             }
//         ]
//     },
//     {
//         id: 9,
//         application: "Lighting",
//         ignoreProperties: ['voltage'],
//         categories: [
//             {
//                 materialName: 'Pendant Light',
//                 unit: "piece",
//                 types: ['Single', 'Cluster', 'Other']
//             },
//             {
//                 materialName: 'Ceiling Light',
//                 unit: "piece",
//                 types: ['Flush', 'Semi-Flush', 'Other']
//             },
//             {
//                 materialName: 'Wall Light',
//                 unit: "piece",
//                 types: ['Sconce', 'Swing Arm', 'Other']
//             },
//             {
//                 materialName: 'Floor Lamp',
//                 unit: "piece",
//                 types: ['Standard', 'Arc', 'Other']
//             },
//             {
//                 materialName: 'Table Lamp',
//                 unit: "piece",
//                 types: ['Desk', 'Bedside', 'Other']
//             },
//             {
//                 materialName: 'Chandelier',
//                 unit: "piece",
//                 types: ['Crystal', 'Drum', 'Other']
//             },
//             {
//                 materialName: 'LED Lighting',
//                 unit: "piece",
//                 types: ['Strip', 'Bulb', 'Other']
//             }
//         ]
//     }
// ];

let materialCategories = [
    {
        id: 1,
        application: "Structural Work",
        ignoreProperties: [
            "voltage",
            "material",
            "base"
        ],
        categories: [
            {
                materialName: "Concrete",
                unit: "m³",
                types: [
                    "Ready-Mix",
                    "Precast",
                    "On-Site",
                    "Other"
                ]
            },
            {
                materialName: "Cement",
                unit: "kg",
                types: [
                    "Portland",
                    "Blended",
                    "Slag",
                    "Other"
                ]
            },
            {
                materialName: "Sand",
                unit: "m³",
                types: [
                    "River",
                    "Beach",
                    "Quarry",
                    "Other"
                ]
            },
            {
                materialName: "Gravel",
                unit: "m³",
                types: [
                    "Crushed",
                    "Natural",
                    "Recycled",
                    "Other"
                ]
            },
            {
                materialName: "Stone",
                unit: "m²",
                types: [
                    "Granite",
                    "Marble",
                    "Limestone",
                    "Other"
                ]
            },
            {
                materialName: "Brick",
                unit: "piece",
                types: [
                    "Clay",
                    "Concrete",
                    "Other"
                ]
            },
            {
                materialName: "Concrete Block",
                unit: "piece",
                types: [
                    "Hollow",
                    "Solid",
                    "Other"
                ]
            }
        ]
    },
    {
        id: 2,
        application: "Secondary Work",
        ignoreProperties: [
            "voltage",
            "material",
            "base"
        ],
        categories: [
            {
                materialName: "Timber for Framing",
                unit: "m³",
                types: [
                    "Softwood",
                    "Hardwood",
                    "Other"
                ]
            },
            {
                materialName: "Wood for Joinery",
                unit: "m²",
                types: [
                    "Oak",
                    "Pine",
                    "Other"
                ]
            },
            {
                materialName: "Metal for Framing",
                unit: "kg",
                types: [
                    "Steel",
                    "Aluminum",
                    "Other"
                ]
            },
            {
                materialName: "Metal for Joinery",
                unit: "kg",
                types: [
                    "Brass",
                    "Copper",
                    "Other"
                ]
            },
            {
                materialName: "Glass",
                unit: "m²",
                types: [
                    "Tempered",
                    "Laminated",
                    "Other"
                ]
            },
            {
                materialName: "Aluminum",
                unit: "kg",
                types: [
                    "Extruded",
                    "Cast",
                    "Other"
                ]
            },
            {
                materialName: "PVC",
                unit: "m²",
                types: []
            }
        ]
    },
    {
        id: 3,
        application: "Finishing",
        ignoreProperties: [
            "voltage"
        ],
        categories: [
            {
                materialName: "Paint",
                unit: "L",
                types: [
                    "Acrylic",
                    "Oil-Based",
                    "Other"
                ]
            },
            {
                materialName: "Varnish",
                unit: "L",
                types: [
                    "Polyurethane",
                    "Shellac",
                    "Other"
                ]
            },
            {
                materialName: "Lacquer",
                unit: "L",
                types: [
                    "Nitrocellulose",
                    "Polyurethane",
                    "Other"
                ]
            },
            {
                materialName: "Wallpaper",
                unit: "m²",
                types: [
                    "Vinyl",
                    "Paper",
                    "Other"
                ]
            },
            {
                materialName: "Tile",
                unit: "m²",
                types: [
                    "Ceramic",
                    "Porcelain",
                    "Other"
                ]
            },
            {
                materialName: "Parquet",
                unit: "m²",
                types: [
                    "Oak",
                    "Maple",
                    "Other"
                ]
            },
            {
                materialName: "Carpet",
                unit: "m²",
                types: [
                    "Wool",
                    "Synthetic",
                    "Other"
                ]
            }
        ]
    },
    {
        id: 4,
        application: "Insulation",
        ignoreProperties: [
            "voltage",
            "size",
            "color",
            "style",
            "material",
            "finish",
            "base"
        ],
        categories: [
            {
                materialName: "Glass Wool",
                unit: "m²",
                types: [
                    "Blown",
                    "Batt",
                    "Other"
                ]
            },
            {
                materialName: "Rock Wool",
                unit: "m²",
                types: [
                    "Blown",
                    "Batt",
                    "Other"
                ]
            },
            {
                materialName: "Polyurethane Foam",
                unit: "m²",
                types: [
                    "Spray",
                    "Board",
                    "Other"
                ]
            },
            {
                materialName: "Polyisocyanurate Foam",
                unit: "m²",
                types: [
                    "Board",
                    "Other"
                ]
            },
            {
                materialName: "Wood Fiber",
                unit: "m²",
                types: [
                    "Board",
                    "Other"
                ]
            },
            {
                materialName: "Bamboo Fiber",
                unit: "m²",
                types: [
                    "Board",
                    "Other"
                ]
            },
            {
                materialName: "Hemp Fiber",
                unit: "m²",
                types: [
                    "Board",
                    "Other"
                ]
            }
        ]
    },
    {
        id: 5,
        application: "Electricity",
        ignoreProperties: [
            "thickness",
            "material",
            "base",
            "finish"
        ],
        categories: [
            {
                materialName: "Electrical Cable",
                unit: "m",
                types: [
                    "Copper",
                    "Aluminum",
                    "Other"
                ]
            },
            {
                materialName: "Power Outlet",
                unit: "piece",
                types: [
                    "Standard",
                    "GFCI",
                    "Other"
                ]
            },
            {
                materialName: "Light Switch",
                unit: "piece",
                types: [
                    "Toggle",
                    "Dimmer",
                    "Other"
                ]
            },
            {
                materialName: "Electrical Plug",
                unit: "piece",
                types: [
                    "2-Prong",
                    "3-Prong",
                    "Other"
                ]
            },
            {
                materialName: "Lamp",
                unit: "piece",
                types: [
                    "Incandescent",
                    "LED",
                    "Other"
                ]
            },
            {
                materialName: "Light Bulb",
                unit: "piece",
                types: [
                    "Incandescent",
                    "LED",
                    "Other"
                ]
            },
            {
                materialName: "LED Lighting",
                unit: "piece",
                types: [
                    "Strip",
                    "Bulb",
                    "Other"
                ]
            }
        ]
    },
    {
        id: 6,
        application: "Plumbing",
        ignoreProperties: [
            "voltage",
            "material"
        ],
        categories: [
            {
                materialName: "Copper Pipe",
                unit: "m",
                types: [
                    "Type L",
                    "Type K",
                    "Other"
                ]
            },
            {
                materialName: "PVC Pipe",
                unit: "m",
                types: [
                    "Schedule 40",
                    "Schedule 80",
                    "Other"
                ]
            },
            {
                materialName: "PE Pipe",
                unit: "m",
                types: [
                    "HDPE",
                    "LDPE",
                    "Other"
                ]
            },
            {
                materialName: "Faucet",
                unit: "piece",
                types: [
                    "Single Handle",
                    "Double Handle",
                    "Other"
                ]
            },
            {
                materialName: "Sink",
                unit: "piece",
                types: [
                    "Single Bowl",
                    "Double Bowl",
                    "Other"
                ]
            },
            {
                materialName: "Bathtub",
                unit: "piece",
                types: [
                    "Freestanding",
                    "Built-in",
                    "Other"
                ]
            },
            {
                materialName: "Shower",
                unit: "piece",
                types: [
                    "Wall-Mounted",
                    "Ceiling-Mounted",
                    "Other"
                ]
            }
        ]
    },
    {
        id: 7,
        application: "Heating",
        ignoreProperties: ['thickness', 'base', 'voltage', 'finish'],
        categories: [
            {
                materialName: "Gas Boiler",
                unit: "piece",
                types: [
                    "Condensing",
                    "Non-Condensing",
                    "Other"
                ]
            },
            {
                materialName: "Oil Boiler",
                unit: "piece",
                types: [
                    "Condensing",
                    "Non-Condensing",
                    "Other"
                ]
            },
            {
                materialName: "Wood Boiler",
                unit: "piece",
                types: [
                    "Condensing",
                    "Non-Condensing",
                    "Other"
                ]
            },
            {
                materialName: "Coal Boiler",
                unit: "piece",
                types: [
                    "Condensing",
                    "Non-Condensing",
                    "Other"
                ]
            },
            {
                materialName: "Cast Iron Radiator",
                unit: "piece",
                types: [
                    "Wall-Mounted",
                    "Floor-Mounted",
                    "Other"
                ]
            },
            {
                materialName: "Steel Radiator",
                unit: "piece",
                types: [
                    "Wall-Mounted",
                    "Floor-Mounted",
                    "Other"
                ]
            },
            {
                materialName: "Aluminum Radiator",
                unit: "piece",
                types: [
                    "Wall-Mounted",
                    "Floor-Mounted",
                    "Other"
                ]
            }
        ]
    },
    {
        id: 8,
        application: "Decoration",
        ignoreProperties: ['thickness', 'voltage'],

        categories: [
            {
                materialName: "Wooden Furniture",
                unit: "piece",
                types: [
                    "Chair",
                    "Table",
                    "Other"
                ]
            },
            {
                materialName: "Metal Furniture",
                unit: "piece",
                types: [
                    "Chair",
                    "Table",
                    "Other"
                ]
            },
            {
                materialName: "Glass Furniture",
                unit: "piece",
                types: [
                    "Table",
                    "Shelf",
                    "Other"
                ]
            },
            {
                materialName: "Wall Covering",
                unit: "m²",
                types: [
                    "Wallpaper",
                    "Paint",
                    "Other"
                ]
            },
            {
                materialName: "Wallpaper",
                unit: "m²",
                types: [
                    "Vinyl",
                    "Paper",
                    "Other"
                ]
            },
            {
                materialName: "Paint",
                unit: "L",
                types: [
                    "Acrylic",
                    "Oil-Based",
                    "Other"
                ]
            },
            {
                materialName: "Varnish",
                unit: "L",
                types: [
                    "Polyurethane",
                    "Shellac",
                    "Other"
                ]
            }
        ]
    },
    {
        id: 9,
        application: "Lighting",
        ignoreProperties: ['thickness', 'base', 'voltage', 'finish'],

        categories: [
            {
                materialName: "Pendant Light",
                unit: "piece",
                types: [
                    "Single",
                    "Cluster",
                    "Other"
                ]
            },
            {
                materialName: "Ceiling Light",
                unit: "piece",
                types: [
                    "Flush",
                    "Semi-Flush",
                    "Other"
                ]
            },
            {
                materialName: "Wall Light",
                unit: "piece",
                types: [
                    "Sconce",
                    "Swing Arm",
                    "Other"
                ]
            },
            {
                materialName: "Floor Lamp",
                unit: "piece",
                types: [
                    "Standard",
                    "Arc",
                    "Other"
                ]
            },
            {
                materialName: "Table Lamp",
                unit: "piece",
                types: [
                    "Desk",
                    "Bedside",
                    "Other"
                ]
            },
            {
                materialName: "Chandelier",
                unit: "piece",
                types: [
                    "Crystal",
                    "Drum",
                    "Other"
                ]
            },
            {
                materialName: "LED Lighting",
                unit: "piece",
                types: [
                    "Strip",
                    "Bulb",
                    "Other"
                ]
            }
        ]
    },
    {
        id: 10,
        application: "Air Conditioning",
        ignoreProperties: ['thickness', 'base', 'voltage', 'finish'],
        categories: [
            {
                materialName: 'Wall-Mounted Air Conditioner',
                unit: "piece",
                types: ['Split', 'Window', 'Other']
            },
            {
                materialName: 'Split Air Conditioner',
                unit: "piece",
                types: ['Ductless', 'Ducted', 'Other']
            },
            {
                materialName: 'Ceiling Fan',
                unit: "piece",
                types: ['With Light', 'Without Light', 'Other']
            },
            {
                materialName: 'Standing Fan',
                unit: "piece",
                types: ['Oscillating', 'Non-Oscillating', 'Other']
            },
            {
                materialName: 'Table Fan',
                unit: "piece",
                types: ['Oscillating', 'Non-Oscillating', 'Other']
            }
        ]
    },
    {
        id: 11,
        application: "Security",
        ignoreProperties: ['thickness', 'base', 'voltage', 'finish'],
        categories: [
            {
                materialName: 'Fire Alarm',
                unit: "piece",
                types: ['Smoke', 'Heat', 'Other']
            },
            {
                materialName: 'Smoke Detector',
                unit: "piece",
                types: ['Ionization', 'Photoelectric', 'Other']
            },
            {
                materialName: 'Carbon Monoxide Detector',
                unit: "piece",
                types: ['Battery-Operated', 'Hardwired', 'Other']
            },
            {
                materialName: 'Surveillance Camera',
                unit: "piece",
                types: ['Dome', 'Bullet', 'Other']
            },
            {
                materialName: 'Alarm System',
                unit: "piece",
                types: ['Wired', 'Wireless', 'Other']
            },
            {
                materialName: 'Electronic Lock',
                unit: "piece",
                types: ['Keypad', 'Biometric', 'Other']
            }
        ]
    },
    {
        id: 12,
        application: "Home Automation",
        ignoreProperties: ['thickness', 'base', 'voltage', 'finish'],
        categories: [
            {
                materialName: 'Smart Thermostat',
                unit: "piece",
                types: ['Wi-Fi', 'Z-Wave', 'Other']
            },
            {
                materialName: 'Smart Switch',
                unit: "piece",
                types: ['Wi-Fi', 'Z-Wave', 'Other']
            },
            {
                materialName: 'Smart Plug',
                unit: "piece",
                types: ['Wi-Fi', 'Z-Wave', 'Other']
            },
            {
                materialName: 'Smart Lighting',
                unit: "piece",
                types: ['Wi-Fi', 'Z-Wave', 'Other']
            },
            {
                materialName: 'Motorized Roller Blind',
                unit: "piece",
                types: ['Wi-Fi', 'Z-Wave', 'Other']
            },
            {
                materialName: 'Voice Assistant',
                unit: "piece",
                types: ['Wi-Fi', 'Bluetooth', 'Other']
            }
        ]
    },
    {
        id: 13,
        application: "Gardening",
        ignoreProperties: ['voltage', 'base', 'finish'],
        categories: [
            {
                materialName: 'Artificial Grass',
                unit: "m²",
                types: ['Short', 'Long', 'Other']
            },
            {
                materialName: 'Paving Stone',
                unit: "m²",
                types: ['Concrete', 'Natural', 'Other']
            },
            {
                materialName: 'Decorative Gravel',
                unit: "m³",
                types: ['Natural', 'Synthetic', 'Other']
            },
            {
                materialName: 'Potting Soil',
                unit: "m³",
                types: ['Organic', 'Inorganic', 'Other']
            },
            {
                materialName: 'Fertilizer',
                unit: "kg",
                types: ['Organic', 'Synthetic', 'Other']
            },
            {
                materialName: 'Potted Plant',
                unit: "piece",
                types: ['Indoor', 'Outdoor', 'Other']
            },
            {
                materialName: 'Shrub',
                unit: "piece",
                types: ['Evergreen', 'Deciduous', 'Other']
            }
        ]
    },
    {
        id: 14,
        application: "Outdoor Furnishing",
        ignoreProperties: ['voltage', 'base', 'finish', 'thickness'],
        categories: [
            {
                materialName: 'Wooden Deck',
                unit: "m²",
                types: ['Natural', 'Composite', 'Other']
            },
            {
                materialName: 'Composite Deck',
                unit: "m²",
                types: ['Natural', 'Composite', 'Other']
            },
            {
                materialName: 'Pergola',
                unit: "piece",
                types: ['Wooden', 'Metal', 'Other']
            },
            {
                materialName: 'Wooden Fence',
                unit: "m",
                types: ['Picket', 'Privacy', 'Other']
            },
            {
                materialName: 'Metal Fence',
                unit: "m",
                types: ['Chain-Link', 'Wrought Iron', 'Other']
            },
            {
                materialName: 'PVC Fence',
                unit: "m",
                types: ['Picket', 'Privacy', 'Other']
            },
            {
                materialName: 'Gate',
                unit: "piece",
                types: ['Wooden', 'Metal', 'Other']
            }
        ]
    },
    {
        id: 15,
        application: "Kitchen",
        ignoreProperties: ['voltage', 'base', 'finish', 'thickness'],
        categories: [
            {
                materialName: 'Stainless Steel Sink',
                unit: "piece",
                types: ['Single Bowl', 'Double Bowl', 'Other']
            },
            {
                materialName: 'Ceramic Sink',
                unit: "piece",
                types: ['Single Bowl', 'Double Bowl', 'Other']
            },
            {
                materialName: 'Cooktop',
                unit: "piece",
                types: ['Gas', 'Electric', 'Other']
            },
            {
                materialName: 'Range Hood',
                unit: "piece",
                types: ['Ducted', 'Ductless', 'Other']
            }
        ]
    },
    {
        id: 16,
        application: "Bathroom",
        ignoreProperties: ['voltage', 'base', 'finish', 'thickness'],
        categories: [
            {
                materialName: 'Washbasin',
                unit: "piece",
                types: ['Pedestal', 'Wall-Mounted', 'Other']
            },
            {
                materialName: 'Bidet',
                unit: "piece",
                types: ['Floor-Mounted', 'Wall-Mounted', 'Other']
            },
            {
                materialName: 'Wall-Mounted Toilet',
                unit: "piece",
                types: ['Standard', 'Dual Flush', 'Other']
            },
            {
                materialName: 'Floor-Mounted Toilet',
                unit: "piece",
                types: ['Standard', 'Dual Flush', 'Other']
            },
            {
                materialName: 'Towel Rail',
                unit: "piece",
                types: ['Wall-Mounted', 'Floor-Mounted', 'Other']
            }
        ]
    },
    {
        id: 17,
        application: "Floor Coverings",
        ignoreProperties: ['voltage', 'material', 'size', 'base'],
        categories: [
            {
                materialName: 'Floating Parquet',
                unit: "m²",
                types: ['Oak', 'Maple', 'Other']
            },
            {
                materialName: 'Solid Parquet',
                unit: "m²",
                types: ['Oak', 'Maple', 'Other']
            },
            {
                materialName: 'Laminate Parquet',
                unit: "m²",
                types: ['Oak', 'Maple', 'Other']
            },
            {
                materialName: 'Vinyl',
                unit: "m²",
                types: ['Sheet', 'Tile', 'Other']
            },
            {
                materialName: 'Linoleum',
                unit: "m²",
                types: ['Sheet', 'Tile', 'Other']
            },
            {
                materialName: 'PVC Tile',
                unit: "m²",
                types: ['Sheet', 'Tile', 'Other']
            }
        ]
    },
    {
        id: 18,
        application: "Wall Coverings",
        ignoreProperties: ['voltage', 'material', 'size', 'base'],
        categories: [
            {
                materialName: 'Wainscoting',
                unit: "m²",
                types: ['Wood', 'Plastic', 'Other']
            },
            {
                materialName: 'Wood Panel',
                unit: "m²",
                types: ['Oak', 'Maple', 'Other']
            },
            {
                materialName: 'Metal Panel',
                unit: "m²",
                types: ['Steel', 'Aluminum', 'Other']
            },
            {
                materialName: 'Glass Panel',
                unit: "m²",
                types: ['Tempered', 'Laminated', 'Other']
            },
            {
                materialName: 'Plaster Panel',
                unit: "m²",
                types: ['Gypsum', 'Fiber', 'Other']
            }
        ]
    },
    {
        id: 19,
        application: "Accessories",
        ignoreProperties: ['voltage', 'base', 'finish', 'thickness'],
        categories: [
            {
                materialName: 'Blind',
                unit: "piece",
                types: ['Roller', 'Venetian', 'Other']
            },
            {
                materialName: 'Shutter',
                unit: "piece",
                types: ['Wooden', 'Metal', 'Other']
            },
            {
                materialName: 'Photo Frame',
                unit: "piece",
                types: ['Wooden', 'Metal', 'Other']
            }
        ]
    }
];
let materialCategoriesUpdated = [
    {
        id: 1,
        categoryName: "Structural Work",
        materials: [
            {
                materialName: "Concrete",
                unit: "m³",
                filter1: {
                    filterName: "Type",
                    options: ['Ready-Mix', 'Precast', 'On-Site', 'Other']
                },
                filter2: {
                    filterName: "Grade",
                    options: ['C25', 'C30', 'C40', 'Other']
                },
                filter3: {
                    filterName: "Color",
                    options: ['Grey', 'White', 'Beige', 'Other']
                },
                filter4: {
                    filterName: "Strength",
                    options: ['High', 'Medium', 'Low', 'Other']
                },
                filter5: {
                    filterName: "Setting Time",
                    options: ['Fast', 'Slow', 'Medium', 'Other']
                }
            },
            {
                materialName: "Cement",
                unit: "kg",
                filter1: {
                    filterName: "Type",
                    options: ['Portland', 'Blended', 'Slag', 'Other']
                },
                filter2: {
                    filterName: "Grade",
                    options: ['42.5', '52.5', '32.5', 'Other']
                },
                filter3: {
                    filterName: "Color",
                    options: ['Grey', 'White', 'Beige', 'Other']
                },
                filter4: {
                    filterName: "Strength",
                    options: ['High', 'Medium', 'Low', 'Other']
                },
                filter5: {
                    filterName: "Setting Time",
                    options: ['Fast', 'Slow', 'Medium', 'Other']
                }
            },
            {
                materialName: "Sand",
                unit: "m³",
                filter1: {
                    filterName: "Type",
                    options: ['River', 'Beach', 'Quarry', 'Other']
                },
                filter2: {
                    filterName: "Grade",
                    options: ['Fine', 'Coarse', 'Medium', 'Other']
                },
                filter3: {
                    filterName: "Size",
                    options: ['Small', 'Large', 'Medium', 'Other']
                },
                filter4: {
                    filterName: "Color",
                    options: ['Beige', 'Brown', 'White', 'Other']
                },
                filter5: {
                    filterName: "Moisture Content",
                    options: ['Low', 'High', 'Medium', 'Other']
                }
            },
            {
                materialName: "Gravel",
                unit: "m³",
                filter1: {
                    filterName: "Type",
                    options: ['Crushed', 'Natural', 'Recycled', 'Other']
                },
                filter2: {
                    filterName: "Grade",
                    options: ['5mm', '10mm', '20mm', 'Other']
                },
                filter3: {
                    filterName: "Color",
                    options: ['Grey', 'Brown', 'Black', 'Other']
                },
                filter4: {
                    filterName: "Shape",
                    options: ['Round', 'Angular', 'Mixed', 'Other']
                },
                filter5: {
                    filterName: "Hardness",
                    options: ['Soft', 'Hard', 'Medium', 'Other']
                }
            },
            {
                materialName: "Stone",
                unit: "m²",
                filter1: {
                    filterName: "Type",
                    options: ['Granite', 'Marble', 'Limestone', 'Other']
                },
                filter2: {
                    filterName: "Finish",
                    options: ['Polished', 'Rough', 'Honed', 'Other']
                },
                filter3: {
                    filterName: "Color",
                    options: ['Black', 'White', 'Grey', 'Other']
                },
                filter4: {
                    filterName: "Thickness",
                    options: ['1cm', '2cm', '3cm', 'Other']
                },
                filter5: {
                    filterName: "Texture",
                    options: ['Smooth', 'Rough', 'Other']
                }
            },
            {
                materialName: "Brick",
                unit: "piece",
                filter1: {
                    filterName: "Type",
                    options: ['Clay', 'Concrete', 'Other']
                },
                filter2: {
                    filterName: "Size",
                    options: ['Standard', 'Jumbo', 'Other']
                },
                filter3: {
                    filterName: "Color",
                    options: ['Red', 'Grey', 'Brown', 'Other']
                },
                filter4: {
                    filterName: "Strength",
                    options: ['High', 'Medium', 'Low', 'Other']
                },
                filter5: {
                    filterName: "Texture",
                    options: ['Smooth', 'Rough', 'Other']
                }
            },
            {
                materialName: "Concrete Block",
                unit: "piece",
                filter1: {
                    filterName: "Type",
                    options: ['Hollow', 'Solid', 'Other']
                },
                filter2: {
                    filterName: "Size",
                    options: ['8"', '10"', '12"', 'Other']
                },
                filter3: {
                    filterName: "Color",
                    options: ['Grey', 'White', 'Other']
                },
                filter4: {
                    filterName: "Strength",
                    options: ['High', 'Medium', 'Low', 'Other']
                },
                filter5: {
                    filterName: "Texture",
                    options: ['Smooth', 'Rough', 'Other']
                }
            }
        ]
    }
];


let materialColors = [
    "Grey", "White", "Beige", "Brown", "Black", "Red",
    "Clear", "Tinted", "Copper", "Silver", "Yellow", "Other"
];

let materialSizes = [
    "Small", "Large", "Medium", "Standard", "Jumbo",
    "8\"", "10\"", "12\"", "2x4", "2x6", "1\"", "2\"",
    "30x30", "60x60", "10x10", "20x20", "1mm", "2mm",
    "5mm", "10mm", "20mm", "5cm", "10cm", "50cm", "100cm", "Other"
];

let materials = [
    "Wool", "Nylon", "Stainless Steel", "Ceramic",
    "Acrylic", "Cast Iron", "Steel", "Aluminum",
    "Glass", "Metal", "Plastic", "Wood", "Oak", "Pine", "Other"
];

let materialBases = [
    "Water", "Oil", "Other"
];

let materialThickness = [
    "1cm", "2cm", "3cm", "5mm", "10mm", "20mm",
    "1mm", "2mm", "5cm", "10cm", "Other"
];

let materialFinish = [
    "Polished", "Rough", "Honed", "Natural", "Stained",
    "Painted", "Brushed", "Matte", "Gloss", "Satin", "Chrome", "Other"
];

let materialVoltage = [
    "110V", "220V", "Other"
];



export { materialCategories, materialColors, materialSizes, materialBases, materialThickness, materialFinish, materialVoltage, materials }