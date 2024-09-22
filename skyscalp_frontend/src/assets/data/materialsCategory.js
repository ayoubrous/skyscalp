
// otherBase,
//                 otherColor,
//                 otherFinish,
//                 otherMaterial,
//                 otherSize,
//                 otherThickness,
//                 otherType,
//                 otherVoltage,


let materialCategories = [
    {
        id: 1,
        application: "Structural Work",

        categories: [
            {
                materialName: "Concrete",
                unit: "m³",
                types: [
                    "Ready-Mix",
                    "Precast",
                    "On-Site",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "size",
                    "thickness",
                    "finish"
                ],
            },
            {
                materialName: "Cement",
                unit: "kg",
                types: [
                    "Portland",
                    "Blended",
                    "Slag",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "size",
                    "thickness",
                    "finish"
                ],
            },
            {
                materialName: "Sand",
                unit: "m³",
                types: [
                    "River",
                    "Beach",
                    "Quarry",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "thickness",
                    "finish"
                ],
            },
            {
                materialName: "Gravel",
                unit: "m³",
                types: [
                    "Crushed",
                    "Natural",
                    "Recycled",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "thickness",
                    "finish",
                    "size"
                ],
            },
            {
                materialName: "Stone",
                unit: "m²",
                types: [
                    "Granite",
                    "Marble",
                    "Limestone",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "size"
                ],
            },
            {
                materialName: "Brick",
                unit: "piece",
                types: [
                    "Clay",
                    "Concrete",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "finish",
                    "thickness"

                ],
            },
            {
                materialName: "Concrete Block",
                unit: "piece",
                types: [
                    "Hollow",
                    "Solid",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "finish",
                    "thickness"
                ],
            }
        ]
    },
    {
        id: 2,
        application: "Secondary Work",

        categories: [
            {
                materialName: "Timber for Framing",
                unit: "m³",
                types: [
                    "Softwood",
                    "Hardwood",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "color",
                    "thickness"
                ],
            },
            {
                materialName: "Wood for Joinery",
                unit: "m²",
                types: [
                    "Oak",
                    "Pine",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "color",
                    "thickness"
                ],
            },
            {
                materialName: "Metal for Framing",
                unit: "kg",
                types: [
                    "Steel",
                    "Aluminum",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "color",
                ],
            },
            {
                materialName: "Metal for Joinery",
                unit: "kg",
                types: [
                    "Brass",
                    "Copper",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "color",
                ],
            },
            {
                materialName: "Glass",
                unit: "m²",
                types: [
                    "Tempered",
                    "Laminated",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "size",
                    "finish",
                ],
            },
            {
                materialName: "Aluminum",
                unit: "kg",
                types: [
                    "Extruded",
                    "Cast",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "color",
                ],
            },
            {
                materialName: "PVC",
                unit: "m²",
                types: [],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "size",
                    "finish",
                ],
            },
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
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "size",
                    "thickness"
                ],
            },
            {
                materialName: "Varnish",
                unit: "L",
                types: [
                    "Polyurethane",
                    "Shellac",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "size",
                    "thickness"
                ],
            },
            {
                materialName: "Lacquer",
                unit: "L",
                types: [
                    "Nitrocellulose",
                    "Polyurethane",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "size",
                    "thickness"
                ],
            },
            {
                materialName: "Wallpaper",
                unit: "m²",
                types: [
                    "Vinyl",
                    "Paper",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                    "size",
                    "finish",
                    "thickness"
                ],
            },
            {
                materialName: "Tile",
                unit: "m²",
                types: [
                    "Ceramic",
                    "Porcelain",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                ],
            },
            {
                materialName: "Parquet",
                unit: "m²",
                types: [
                    "Oak",
                    "Maple",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "material",
                    "base",
                ],
            },
            {
                materialName: "Carpet",
                unit: "m²",
                types: [
                    "Wool",
                    "Synthetic",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "size",
                    "finish",
                ],
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
        "categories": [
            {
                materialName: "Glass Wool",
                unit: "m²",
                unit: [
                    "Blown",
                    "Batt",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "size",
                    "color",
                    "style",
                    "material",
                    "finish",
                    "base"
                ]
            },
            {
                materialName: "Rock Wool",
                unit: "m²",
                unit: [
                    "Blown",
                    "Batt",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "size",
                    "color",
                    "style",
                    "material",
                    "finish",
                    "base"
                ]
            },
            {
                materialName: "Polyurethane Foam",
                unit: "m²",
                unit: [
                    "Spray",
                    "Board",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "size",
                    "color",
                    "style",
                    "material",
                    "finish",
                    "base"
                ]
            },
            {
                materialName: "Polyisocyanurate Foam",
                unit: "m²",
                unit: [
                    "Board",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "size",
                    "color",
                    "style",
                    "material",
                    "finish",
                    "base"
                ]
            },
            {
                materialName: "Wood Fiber",
                unit: "m²",
                unit: [
                    "Board",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "size",
                    "color",
                    "style",
                    "material",
                    "finish",
                    "base"
                ]
            },
            {
                materialName: "Bamboo Fiber",
                unit: "m²",
                unit: [
                    "Board",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "size",
                    "color",
                    "style",
                    "material",
                    "finish",
                    "base"
                ]
            },
            {
                materialName: "Hemp Fiber",
                unit: "m²",
                unit: [
                    "Board",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "size",
                    "color",
                    "style",
                    "material",
                    "finish",
                    "base"
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
        "categories": [
            {
                materialName: "Electrical Cable",
                unit: "m",
                unit: [
                    "Copper",
                    "Aluminum",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "material",
                    "base",
                    "finish"
                ]
            },
            {
                materialName: "Power Outlet",
                unit: "piece",
                unit: [
                    "Standard",
                    "GFCI",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "material",
                    "base",
                    "finish",
                    "insulation"
                ]
            },
            {
                materialName: "Light Switch",
                unit: "piece",
                unit: [
                    "Toggle",
                    "Dimmer",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "material",
                    "base",
                    "finish",
                    "insulation"
                ]
            },
            {
                materialName: "Electrical Plug",
                unit: "piece",
                unit: [
                    "2-Prong",
                    "3-Prong",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "material",
                    "base",
                    "finish",
                    "insulation"
                ]
            },
            {
                materialName: "Lamp",
                unit: "piece",
                unit: [
                    "Incandescent",
                    "LED",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "material",
                    "base",
                    "finish",
                    "insulation",
                    "amperage"
                ]
            },
            {
                materialName: "Light Bulb",
                unit: "piece",
                unit: [
                    "Incandescent",
                    "LED",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "material",
                    "base",
                    "finish",
                    "insulation",
                    "amperage"
                ]
            },
            {
                materialName: "LED Lighting",
                unit: "piece",
                unit: [
                    "Strip",
                    "Bulb",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "material",
                    "base",
                    "finish",
                    "insulation",
                    "amperage"
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
                ],
                ignoreProperties: [
                    "voltage",
                    "finish",
                    "brand", "size", "material", "base",
                ]
            },
            {
                materialName: "PVC Pipe",
                unit: "m",
                types: [
                    "Schedule 40",
                    "Schedule 80",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "finish",
                    "brand", "size", "material", "base",
                ]
            },
            {
                materialName: "PE Pipe",
                unit: "m",
                types: [
                    "HDPE",
                    "LDPE",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "finish",
                    "brand", "size", "material", "base",
                ]
            },
            {
                materialName: "Faucet",
                unit: "piece",
                types: [
                    "Single Handle",
                    "Double Handle",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "brand","thickness", "material", "base",
                ]
            },
            {
                materialName: "Sink",
                unit: "piece",
                types: [
                    "Single Bowl",
                    "Double Bowl",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "finish",
                    "brand", "thickness", "base",
                ]
            },
            {
                materialName: "Bathtub",
                unit: "piece",
                types: [
                    "Freestanding",
                    "Built-in",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "finish",
                    "brand", "thickness", "base",
                ]
            },
            {
                materialName: "Shower",
                unit: "piece",
                types: [
                    "Wall-Mounted",
                    "Ceiling-Mounted",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "finish",
                    "brand", "thickness", "base",
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
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "color", "material", "voltage"
                ]
            },
            {
                materialName: "Oil Boiler",
                unit: "piece",
                types: [
                    "Condensing",
                    "Non-Condensing",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "color", "material", "voltage"
                ]
            },
            {
                materialName: "Wood Boiler",
                unit: "piece",
                types: [
                    "Condensing",
                    "Non-Condensing",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "color", "material", "voltage"
                ]
            },
            {
                materialName: "Coal Boiler",
                unit: "piece",
                types: [
                    "Condensing",
                    "Non-Condensing",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "color", "material", "voltage"
                ]
            },
            {
                materialName: "Cast Iron Radiator",
                unit: "piece",
                types: [
                    "Wall-Mounted",
                    "Floor-Mounted",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish", "voltage"
                ]
            },
            {
                materialName: "Steel Radiator",
                unit: "piece",
                types: [
                    "Wall-Mounted",
                    "Floor-Mounted",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish", "voltage"
                ]
            },
            {
                materialName: "Aluminum Radiator",
                unit: "piece",
                types: [
                    "Wall-Mounted",
                    "Floor-Mounted",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish", "voltage"
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
                ],
                ignoreProperties: [
                    "voltage",
                    "brand",
                    "base", "thickness", "finish"
                ]
            },
            {
                materialName: "Metal Furniture",
                unit: "piece",
                types: [
                    "Chair",
                    "Table",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "brand",
                    "base", "thickness", "finish"
                ]
            },
            {
                materialName: "Glass Furniture",
                unit: "piece",
                types: [
                    "Table",
                    "Shelf",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "brand",
                    "base", "thickness", "finish"
                ]
            },
            {
                materialName: "Wall Covering",
                unit: "m²",
                types: [
                    "Wallpaper",
                    "Paint",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "brand",
                    "size",
                    "material",
                    "base",
                    "thickness", "finish"
                ]
            },
            {
                materialName: "Wallpaper",
                unit: "m²",
                types: [
                    "Vinyl",
                    "Paper",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "size",
                    "thickness", "base", "material", "base", "finish"
                ]
            },
            {
                materialName: "Paint",
                unit: "L",
                types: [
                    "Acrylic",
                    "Oil-Based",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "brand",
                    "size",
                    "thickness",
                    "material"
                ]
            },
            {
                materialName: "Varnish",
                unit: "L",
                types: [
                    "Polyurethane",
                    "Shellac",
                    "Other"
                ],
                ignoreProperties: [
                    "voltage",
                    "brand",
                    "size",
                    "thickness",
                    "material"
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
                    "Single", "Multiple", "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "voltage"
                ]
            },
            {
                materialName: "Recessed Light",
                unit: "piece",
                types: [
                    "LED", "Halogen", "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "voltage"
                ]
            },
            {
                materialName: "Floor Lamp",
                unit: "piece",
                types: [
                    "Standing", "Arc",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "voltage"
                ]
            },
            {
                materialName: "Table Lamp",
                unit: "piece",
                types: [
                    "Desk", "Bedside",
                    "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "voltage"
                ]
            },
            {
                materialName: "LED Strip",
                unit: "m",
                types: [
                    "Flexible", "Rigid", "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "voltage"
                ]
            },
            {
                materialName: "Spotlight",
                unit: "piece",
                types: [
                    "LED", "Halogen", "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "voltage"
                ]
            },
            {
                materialName: "Wall Sconce",
                unit: "piece",
                types: [
                    "Single", "Double", "Other"
                ],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "voltage"
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
                types: ['Split', 'Window', 'Other'],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "material"
                ]
            },
            {
                materialName: 'Split Air Conditioner',
                unit: "piece",
                types: ['Ductless', 'Ducted', 'Other'],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "material"
                ]
            },
            {
                materialName: 'Ceiling Fan',
                unit: "piece",
                types: ['With Light', 'Without Light', 'Other'],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "efficiency"
                ]
            },
            {
                materialName: 'Standing Fan',
                unit: "piece",
                types: ['Oscillating', 'Non-Oscillating', 'Other'],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "efficiency"
                ]
            },
            {
                materialName: 'Table Fan',
                unit: "piece",
                types: ['Oscillating', 'Non-Oscillating', 'Other'],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "efficiency"
                ]
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
                types: ['Smoke', 'Heat', 'Other'],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "voltage"
                ]
            },
            {
                materialName: 'Smoke Detector',
                unit: "piece",
                types: ['Ionization', 'Photoelectric', 'Other'],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish",
                    "voltage"
                ]
            },
            {
                materialName: 'Carbon Monoxide Detector',
                unit: "piece",
                types: ['Battery-Operated', 'Hardwired', 'Other'],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish"
                ]
            },
            {
                materialName: 'Surveillance Camera',
                unit: "piece",
                types: ['Dome', 'Bullet', 'Other'],
                ignoreProperties: [
                    "thickness",
                    "base",
                    "finish"
                ]
            },
            {
                materialName: 'Alarm System',
                unit: "piece",
                types: ['Wired', 'Wireless', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Electronic Lock',
                unit: "piece",
                types: ['Keypad', 'Biometric', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
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
                types: ['Wi-Fi', 'Z-Wave', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Smart Switch',
                unit: "piece",
                types: ['Wi-Fi', 'Z-Wave', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Smart Plug',
                unit: "piece",
                types: ['Wi-Fi', 'Z-Wave', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Smart Lighting',
                unit: "piece",
                types: ['Wi-Fi', 'Z-Wave', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Motorized Roller Blind',
                unit: "piece",
                types: ['Wi-Fi', 'Z-Wave', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Voice Assistant',
                unit: "piece",
                types: ['Wi-Fi', 'Bluetooth', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
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
                types: ['Short', 'Long', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "finish",
                    "size"
                ]
            },
            {
                materialName: 'Paving Stone',
                unit: "m²",
                types: ['Concrete', 'Natural', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "finish",
                    "size"
                ]
            },
            {
                materialName: 'Decorative Gravel',
                unit: "m³",
                types: ['Natural', 'Synthetic', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Potting Soil',
                unit: "m³",
                types: ['Organic', 'Inorganic', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Fertilizer',
                unit: "kg",
                types: ['Organic', 'Synthetic', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Potted Plant',
                unit: "piece",
                types: ['Indoor', 'Outdoor', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Shrub',
                unit: "piece",
                types: ['Evergreen', 'Deciduous', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
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
                types: ['Natural', 'Composite', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Composite Deck',
                unit: "m²",
                types: ['Natural', 'Composite', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Pergola',
                unit: "piece",
                types: ['Wooden', 'Metal', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Wooden Fence',
                unit: "m",
                types: ['Picket', 'Privacy', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Metal Fence',
                unit: "m",
                types: ['Chain-Link', 'Wrought Iron', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'PVC Fence',
                unit: "m",
                types: ['Picket', 'Privacy', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Gate',
                unit: "piece",
                types: ['Wooden', 'Metal', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
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
                types: ['Single Bowl', 'Double Bowl', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Ceramic Sink',
                unit: "piece",
                types: ['Single Bowl', 'Double Bowl', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Cooktop',
                unit: "piece",
                types: ['Gas', 'Electric', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Range Hood',
                unit: "piece",
                types: ['Ducted', 'Ductless', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
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
                types: ['Pedestal', 'Wall-Mounted', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Bidet',
                unit: "piece",
                types: ['Floor-Mounted', 'Wall-Mounted', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Wall-Mounted Toilet',
                unit: "piece",
                types: ['Standard', 'Dual Flush', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Floor-Mounted Toilet',
                unit: "piece",
                types: ['Standard', 'Dual Flush', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
            },
            {
                materialName: 'Towel Rail',
                unit: "piece",
                types: ['Wall-Mounted', 'Floor-Mounted', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "thickness",
                    "finish",
                ]
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
                types: ['Oak', 'Maple', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
            },
            {
                materialName: 'Solid Parquet',
                unit: "m²",
                types: ['Oak', 'Maple', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
            },
            {
                materialName: 'Laminate Parquet',
                unit: "m²",
                types: ['Oak', 'Maple', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
            },
            {
                materialName: 'Vinyl',
                unit: "m²",
                types: ['Sheet', 'Tile', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
            },
            {
                materialName: 'Linoleum',
                unit: "m²",
                types: ['Sheet', 'Tile', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
            },
            {
                materialName: 'PVC Tile',
                unit: "m²",
                types: ['Sheet', 'Tile', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
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
                types: ['Wood', 'Plastic', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
            },
            {
                materialName: 'Wood Panel',
                unit: "m²",
                types: ['Oak', 'Maple', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
            },
            {
                materialName: 'Metal Panel',
                unit: "m²",
                types: ['Steel', 'Aluminum', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
            },
            {
                materialName: 'Glass Panel',
                unit: "m²",
                types: ['Tempered', 'Laminated', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
            },
            {
                materialName: 'Plaster Panel',
                unit: "m²",
                types: ['Gypsum', 'Fiber', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "brand",
                    "material"
                ]
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
                types: ['Roller', 'Venetian', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "finish",
                    "thickness"
                ]
            },
            {
                materialName: 'Shutter',
                unit: "piece",
                types: ['Wooden', 'Metal', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "finish",
                    "thickness"
                ]
            },
            {
                materialName: 'Photo Frame',
                unit: "piece",
                types: ['Wooden', 'Metal', 'Other'],
                ignoreProperties: [
                    "voltage",
                    "base",
                    "finish",
                    "thickness"
                ]
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