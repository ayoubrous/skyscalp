import React, { useState } from 'react';
import { cats } from './assets/data/materialsCategory';

export default function Test() {
    const [cat, setCat] = useState("");
    const [mat, setMat] = useState("");
    const [type, setType] = useState("");
    const [ch1, setCh1] = useState("");
    const [ch2, setCh2] = useState("");
    const [ch3, setCh3] = useState("");
    const [ch4, setCh4] = useState("");

    const selectedCategory = cats.find(c => c.category === cat);
    const selectedMaterial = selectedCategory?.materials.find(m => m.name === mat);

    return (
        <div style={{ width: "400px" }}>
            <h3>Test</h3>

            {/* Category Select */}
            <label htmlFor="category">Category</label>
            <select id="category" className="custom-input mb-2 py-1" onChange={e => setCat(e.target.value)}>
                <option value="">Select Category</option>
                {
                    cats.map((data, i) => (
                        <option value={data.category} key={i}>{data.category}</option>
                    ))
                }
            </select>

            {/* Material Select */}
            {cat && (
                <>
                    <label htmlFor="material">Material</label>
                    <select id="material" className="custom-input mb-2 py-1" onChange={e => setMat(e.target.value)}>
                        <option value="">Select Material</option>
                        {
                            selectedCategory.materials.map((material, i) => (
                                <option value={material.name} key={i}>{material.name}</option>
                            ))
                        }
                    </select>
                </>
            )}

            {/* Type Select */}
            {mat && (
                <>
                    <label htmlFor="type">Type</label>
                    <select id="type" className="custom-input mb-2 py-1" onChange={e => setType(e.target.value)}>
                        <option value="">Select Type</option>
                        {
                            selectedMaterial.type.map((typeOption, i) => (
                                <option value={typeOption} key={i}>{typeOption}</option>
                            ))
                        }
                    </select>
                </>
            )}

            {/* Characteristic 1 Select */}
            {mat && (
                <>
                    <label htmlFor="ch1">Characteristic 1</label>
                    <select id="ch1" className="custom-input mb-2 py-1" onChange={e => setCh1(e.target.value)}>
                        <option value="">Select Characteristic 1</option>
                        {
                            selectedMaterial.characteristic1.map((option, i) => (
                                <option value={option} key={i}>{option}</option>
                            ))
                        }
                    </select>
                </>
            )}

            {/* Characteristic 2 Select */}
            {ch1 && (
                <>
                    <label htmlFor="ch2">Characteristic 2</label>
                    <select id="ch2" className="custom-input mb-2 py-1" onChange={e => setCh2(e.target.value)}>
                        <option value="">Select Characteristic 2</option>
                        {
                            selectedMaterial.characteristic2.map((option, i) => (
                                <option value={option} key={i}>{option}</option>
                            ))
                        }
                    </select>
                </>
            )}

            {/* Characteristic 3 Select */}
            {ch2 && (
                <>
                    <label htmlFor="ch3">Characteristic 3</label>
                    <select id="ch3" className="custom-input mb-2 py-1" onChange={e => setCh3(e.target.value)}>
                        <option value="">Select Characteristic 3</option>
                        {
                            selectedMaterial.characteristic3.map((option, i) => (
                                <option value={option} key={i}>{option}</option>
                            ))
                        }
                    </select>
                </>
            )}

            {/* Characteristic 4 Select */}
            {ch3 && (
                <>
                    <label htmlFor="ch4">Characteristic 4</label>
                    <select id="ch4" className="custom-input mb-2 py-1" onChange={e => setCh4(e.target.value)}>
                        <option value="">Select Characteristic 4</option>
                        {
                            selectedMaterial.characteristic4.map((option, i) => (
                                <option value={option} key={i}>{option}</option>
                            ))
                        }
                    </select>
                </>
            )}
        </div>
    );
}
