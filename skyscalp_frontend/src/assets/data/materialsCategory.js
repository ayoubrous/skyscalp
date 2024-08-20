const constructionMaterials = {
    structuralWork: {
        concrete: {
            unit: 'm³',
            type: ['Ready-Mix', 'Precast', 'On-Site', 'Other'],
            grade: ['C25', 'C30', 'C40', 'Other'],
            color: ['Grey', 'White', 'Beige', 'Other'],
            strength: ['High', 'Medium', 'Low', 'Other'],
            settingTime: ['Fast', 'Slow', 'Medium', 'Other']
        },
        cement: {
            unit: 'kg',
            type: ['Portland', 'Blended', 'Slag', 'Other'],
            grade: ['42.5', '52.5', '32.5', 'Other'],
            color: ['Grey', 'White', 'Beige', 'Other'],
            strength: ['High', 'Medium', 'Low', 'Other'],
            settingTime: ['Fast', 'Slow', 'Medium', 'Other']
        },
        sand: {
            unit: 'm³',
            type: ['River', 'Beach', 'Quarry', 'Other'],
            grade: ['Fine', 'Coarse', 'Medium', 'Other'],
            particleSize: ['Small', 'Large', 'Medium', 'Other'],
            color: ['Beige', 'Brown', 'White', 'Other'],
            moistureContent: ['Low', 'High', 'Medium', 'Other']
        },
        gravel: {
            unit: 'm³',
            type: ['Crushed', 'Natural', 'Recycled', 'Other'],
            size: ['5mm', '10mm', '20mm', 'Other'],
            color: ['Grey', 'Brown', 'Black', 'Other'],
            shape: ['Round', 'Angular', 'Mixed', 'Other'],
            hardness: ['Soft', 'Hard', 'Medium', 'Other']
        },
        stone: {
            unit: 'm²',
            type: ['Granite', 'Marble', 'Limestone', 'Other'],
            finish: ['Polished', 'Rough', 'Honed', 'Other'],
            color: ['Black', 'White', 'Grey', 'Other'],
            thickness: ['1cm', '2cm', '3cm', 'Other'],
            texture: ['Smooth', 'Rough', 'Other']
        },
        brick: {
            unit: 'piece',
            type: ['Clay', 'Concrete', 'Other'],
            size: ['Standard', 'Jumbo', 'Other'],
            color: ['Red', 'Grey', 'Brown', 'Other'],
            strength: ['High', 'Medium', 'Low', 'Other'],
            texture: ['Smooth', 'Rough', 'Other']
        },
        concreteBlock: {
            unit: 'piece',
            type: ['Hollow', 'Solid', 'Other'],
            size: ['8"', '10"', '12"', 'Other'],
            color: ['Grey', 'White', 'Other'],
            strength: ['High', 'Medium', 'Low', 'Other'],
            texture: ['Smooth', 'Rough', 'Other']
        }
    },
    secondaryWork: {
        timberForFraming: {
            unit: 'm³',
            type: ['Softwood', 'Hardwood', 'Other'],
            grade: ['A', 'B', 'C', 'Other'],
            finish: ['Natural', 'Stained', 'Painted', 'Other'],
            size: ['2x4', '2x6', 'Other'],
            moistureContent: ['Low', 'High', 'Medium', 'Other']
        },
        woodForJoinery: {
            unit: 'm²',
            type: ['Oak', 'Pine', 'Other'],
            grade: ['A', 'B', 'C', 'Other'],
            finish: ['Natural', 'Stained', 'Painted', 'Other'],
            size: ['1x2', '1x4', 'Other'],
            moistureContent: ['Low', 'High', 'Medium', 'Other']
        },
        metalForFraming: {
            unit: 'kg',
            type: ['Steel', 'Aluminum', 'Other'],
            grade: ['A36', '6061', 'Other'],
            finish: ['Polished', 'Brushed', 'Painted', 'Other'],
            size: ['1"', '2"', 'Other'],
            thickness: ['1mm', '2mm', 'Other']
        },
        metalForJoinery: {
            unit: 'kg',
            type: ['Brass', 'Copper', 'Other'],
            grade: ['A', 'B', 'C', 'Other'],
            finish: ['Polished', 'Brushed', 'Painted', 'Other'],
            size: ['1"', '2"', 'Other'],
            thickness: ['1mm', '2mm', 'Other']
        },
        glass: {
            unit: 'm²',
            type: ['Tempered', 'Laminated', 'Other'],
            thickness: ['5mm', '10mm', 'Other'],
            color: ['Clear', 'Tinted', 'Other'],
            transparency: ['High', 'Medium', 'Low', 'Other'],
            strength: ['High', 'Medium', 'Low', 'Other']
        },
        aluminum: {
            unit: 'kg',
            type: ['Extruded', 'Cast', 'Other'],
            grade: ['6061', '7075', 'Other'],
            finish: ['Polished', 'Brushed', 'Painted', 'Other'],
            size: ['1"', '2"', 'Other'],
            thickness: ['1mm', '2mm', 'Other']
        },
        pvc: {
            unit: 'm²',
            type: ['Rigid', 'Flexible', 'Other'],
            thickness: ['2mm', '5mm', 'Other'],
            color: ['White', 'Grey', 'Other'],
            flexibility: ['High', 'Medium', 'Low', 'Other'],
            texture: ['Smooth', 'Rough', 'Other']
        }
    },
    finishing: {
        paint: {
            unit: 'L',
            type: ['Acrylic', 'Oil-Based', 'Other'],
            finish: ['Matte', 'Gloss', 'Satin', 'Other'],
            color: ['White', 'Black', 'Other'],
            base: ['Water', 'Oil', 'Other'],
            dryingTime: ['Fast', 'Slow', 'Medium', 'Other']
        },
        varnish: {
            unit: 'L',
            type: ['Polyurethane', 'Shellac', 'Other'],
            finish: ['Matte', 'Gloss', 'Satin', 'Other'],
            color: ['Clear', 'Tinted', 'Other'],
            base: ['Water', 'Oil', 'Other'],
            dryingTime: ['Fast', 'Slow', 'Medium', 'Other']
        },
        lacquer: {
            unit: 'L',
            type: ['Nitrocellulose', 'Polyurethane', 'Other'],
            finish: ['Matte', 'Gloss', 'Satin', 'Other'],
            color: ['Clear', 'Tinted', 'Other'],
            base: ['Water', 'Oil', 'Other'],
            dryingTime: ['Fast', 'Slow', 'Medium', 'Other']
        },
        wallpaper: {
            unit: 'm²',
            type: ['Vinyl', 'Paper', 'Other'],
            pattern: ['Floral', 'Geometric', 'Plain', 'Other'],
            color: ['White', 'Black', 'Other'],
            texture: ['Smooth', 'Rough', 'Other'],
            width: ['50cm', '100cm', 'Other']
        },
        tile: {
            unit: 'm²',
            type: ['Ceramic', 'Porcelain', 'Other'],
            size: ['30x30', '60x60', 'Other'],
            color: ['White', 'Grey', 'Other'],
            finish: ['Gloss', 'Matte', 'Other'],
            thickness: ['5mm', '10mm', 'Other']
        },
        parquet: {
            unit: 'm²',
            type: ['Oak', 'Maple', 'Other'],
            finish: ['Natural', 'Stained', 'Painted', 'Other'],
            color: ['Brown', 'Black', 'Other'],
            size: ['10x10', '20x20', 'Other'],
            thickness: ['1cm', '2cm', 'Other']
        },
        carpet: {
            unit: 'm²',
            type: ['Wool', 'Synthetic', 'Other'],
            pattern: ['Plain', 'Patterned', 'Other'],
            color: ['Beige', 'Brown', 'Other'],
            thickness: ['1cm', '2cm', 'Other'],
            material: ['Wool', 'Nylon', 'Other']
        }
    },
    insulation: {
        glassWool: {
            unit: 'm²',
            type: ['Blown', 'Batt', 'Other'],
            thickness: ['5cm', '10cm', 'Other'],
            density: ['Low', 'Medium', 'High', 'Other'],
            rValue: ['R10', 'R20', 'Other'],
            fireResistance: ['Yes', 'No', 'Other']
        },
        rockWool: {
            unit: 'm²',
            type: ['Blown', 'Batt', 'Other'],
            thickness: ['5cm', '10cm', 'Other'],
            density: ['Low', 'Medium', 'High', 'Other'],
            rValue: ['R10', 'R20', 'Other'],
            fireResistance: ['Yes', 'No', 'Other']
        },
        polyurethaneFoam: {
            unit: 'm²',
            type: ['Spray', 'Panel', 'Other'],
            thickness: ['5cm', '10cm', 'Other'],
            density: ['Low', 'Medium', 'High', 'Other'],
            rValue: ['R10', 'R20', 'Other'],
            fireResistance: ['Yes', 'No', 'Other']
        },
        polystyreneFoam: {
            unit: 'm²',
            type: ['Extruded', 'Expanded', 'Other'],
            thickness: ['5cm', '10cm', 'Other'],
            density: ['Low', 'Medium', 'High', 'Other'],
            rValue: ['R10', 'R20', 'Other'],
            fireResistance: ['Yes', 'No', 'Other']
        },
        fiberglass: {
            unit: 'm²',
            type: ['Batt', 'Blown', 'Other'],
            thickness: ['5cm', '10cm', 'Other'],
            density: ['Low', 'Medium', 'High', 'Other'],
            rValue: ['R10', 'R20', 'Other'],
            fireResistance: ['Yes', 'No', 'Other']
        },
        cellulose: {
            unit: 'm²',
            type: ['Blown', 'Loose-fill', 'Other'],
            thickness: ['5cm', '10cm', 'Other'],
            density: ['Low', 'Medium', 'High', 'Other'],
            rValue: ['R10', 'R20', 'Other'],
            fireResistance: ['Yes', 'No', 'Other']
        },
        foamBoard: {
            unit: 'm²',
            type: ['Polystyrene', 'Polyisocyanurate', 'Other'],
            thickness: ['5cm', '10cm', 'Other'],
            density: ['Low', 'Medium', 'High', 'Other'],
            rValue: ['R10', 'R20', 'Other'],
            fireResistance: ['Yes', 'No', 'Other']
        }
    }
};


let cats = [
    {
        id: 1,
        category: 'Structural Work',
        materials: [
            {
                name: "Concrete",
                type: ['Ready-Mix', 'Precast', 'On-Site', 'Other'],
                characteristic1: ['C25', 'C30', 'C40', 'Other'],
                characteristic2: ['Grey', 'White', 'Beige', 'Other'],
                characteristic3: ['High', 'Medium', 'Low', 'Other'],
                characteristic4: ['Fast', 'Slow', 'Medium', 'Other']
            },
            {
                name: "Cement",
                type: ['Portland', 'Blended', 'Slag', 'Other'],
                characteristic1: ['42.5', '52.5', '32.5', 'Other'],
                characteristic2: ['Grey', 'White', 'Beige', 'Other'],
                characteristic3: ['High', 'Medium', 'Low', 'Other'],
                characteristic4: ['Fast', 'Slow', 'Medium', 'Other']
            },
            {
                name: "Sand",
                type: ['River', 'Beach', 'Quarry', 'Other'],
                characteristic1: ['Fine', 'Coarse', 'Medium', 'Other'],
                characteristic2: ['Small', 'Large', 'Medium', 'Other'],
                characteristic3: ['Beige', 'Brown', 'White', 'Other'],
                characteristic4: ['Low', 'High', 'Medium', 'Other']
            },
            {
                name: "Gravel",
                type: ['Crushed', 'Natural', 'Recycled', 'Other'],
                characteristic1: ['5mm', '10mm', '20mm', 'Other'],
                characteristic2: ['Grey', 'Brown', 'Black', 'Other'],
                characteristic3: ['Round', 'Angular', 'Mixed', 'Other'],
                characteristic4: ['Soft', 'Hard', 'Medium', 'Other']
            },
            {
                name: "Stone",
                type: ['Granite', 'Marble', 'Limestone', 'Other'],
                characteristic1: ['Polished', 'Rough', 'Honed', 'Other'],
                characteristic2: ['Black', 'White', 'Grey', 'Other'],
                characteristic3: ['1cm', '2cm', '3cm', 'Other'],
                characteristic4: ['Smooth', 'Rough', 'Other']
            },
            {
                name: "Brick",
                type: ['Clay', 'Concrete', 'Other'],
                characteristic1: ['Standard', 'Jumbo', 'Other'],
                characteristic2: ['Red', 'Grey', 'Brown', 'Other'],
                characteristic3: ['High', 'Medium', 'Low', 'Other'],
                characteristic4: ['Smooth', 'Rough', 'Other']
            },
            {
                name: "Concrete Block",
                type: ['Hollow', 'Solid', 'Other'],
                characteristic1: ['8"', '10"', '12"', 'Other'],
                characteristic2: ['Grey', 'White', 'Other'],
                characteristic3: ['High', 'Medium', 'Low', 'Other'],
                characteristic4: ['Smooth', 'Rough', 'Other']
            }
        ]
    },
    {
        id: 2,
        category: 'Secondary Work',
        materials: [
            {
                name: "Timber for Framing",
                type: ['Softwood', 'Hardwood', 'Other'],
                characteristic1: ['A', 'B', 'C', 'Other'],
                characteristic2: ['Natural', 'Stained', 'Painted', 'Other'],
                characteristic3: ['2x4', '2x6', 'Other'],
                characteristic4: ['Low', 'High', 'Medium', 'Other']
            },
            {
                name: "Wood for Joinery",
                type: ['Oak', 'Pine', 'Other'],
                characteristic1: ['A', 'B', 'C', 'Other'],
                characteristic2: ['Natural', 'Stained', 'Painted', 'Other'],
                characteristic3: ['1x2', '1x4', 'Other'],
                characteristic4: ['Low', 'High', 'Medium', 'Other']
            },
            {
                name: "Metal for Framing",
                type: ['Steel', 'Aluminum', 'Other'],
                characteristic1: ['A36', '6061', 'Other'],
                characteristic2: ['Polished', 'Brushed', 'Painted', 'Other'],
                characteristic3: ['1"', '2"', 'Other'],
                characteristic4: ['1mm', '2mm', 'Other']
            },
            {
                name: "Metal for Joinery",
                type: ['Brass', 'Copper', 'Other'],
                characteristic1: ['A', 'B', 'C', 'Other'],
                characteristic2: ['Polished', 'Brushed', 'Painted', 'Other'],
                characteristic3: ['1"', '2"', 'Other'],
                characteristic4: ['1mm', '2mm', 'Other']
            },
            {
                name: "Glass",
                type: ['Tempered', 'Laminated', 'Other'],
                characteristic1: ['5mm', '10mm', 'Other'],
                characteristic2: ['Clear', 'Tinted', 'Other'],
                characteristic3: ['High', 'Medium', 'Low', 'Other'],
                characteristic4: ['High', 'Medium', 'Low', 'Other']
            },
            {
                name: "Aluminum",
                type: ['Extruded', 'Cast', 'Other'],
                characteristic1: ['6061', '7075', 'Other'],
                characteristic2: ['Polished', 'Brushed', 'Painted', 'Other'],
                characteristic3: ['1"', '2"', 'Other'],
                characteristic4: ['1mm', '2mm', 'Other']
            },
            {
                name: "PVC",
                type: [''],
                characteristic1: ['2mm', '5mm', 'Other'],
                characteristic2: ['White', 'Grey', 'Other'],
                characteristic3: ['High', 'Medium', 'Low', 'Other'],
                characteristic4: ['Smooth', 'Rough', 'Other']
            }
        ]
    }
];


export {cats}