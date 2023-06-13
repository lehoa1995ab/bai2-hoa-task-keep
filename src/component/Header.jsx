import React, { useState,useEffect } from 'react';

export default function Header() {
    const [inputValue, setInputValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [selectValue, setSelectValue] = useState('Fulfill');
    const [otherInputValue, setOtherInputValue] = useState('');
    const [dataList, setDataList] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDateChange = (e) => {
        setDateValue(e.target.value);
    };

    const handleSelectChange = (e) => {
        setSelectValue(e.target.value);
    };

    const handleOtherInputChange = (e) => {
        setOtherInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            id: Date.now(),
            input: inputValue,
            date: dateValue,
            select: selectValue,
            otherInput: otherInputValue,
        };
        setDataList([...dataList, newData]);
        setInputValue('');
        setDateValue('');
        setSelectValue('Fulfill');
        setOtherInputValue('');
    };
    useEffect(() => {
        const savedData = localStorage.getItem('dataList');
        if (savedData) {
            setDataList(JSON.parse(savedData));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('dataList', JSON.stringify(dataList));
    }, [dataList]);
    const handleEdit=(id)=>{

    }
    const handleDelete = (id) => {
        const updatedList = dataList.filter((item) => item.id !== id);
        setDataList(updatedList);
    };
    return (
        <div className='header'style={{
           

        }}>
            <form onSubmit={handleSubmit}style={{
                marginLeft:'100px',
                marginTop:'20px',
                fontSize:"40px"
                
            }}>
                <input
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder='Enter...'
                />
                <input
                    type='date'
                    value={dateValue}
                    onChange={handleDateChange}
                />
                <select value={selectValue} onChange={handleSelectChange}>
                    <option>Fulfill</option>
                    <option>Choose</option>
                    <option>Pending</option>
                    <option>Reject</option>
                </select>
                <input
                    type='text'
                    value={otherInputValue}
                    onChange={handleOtherInputChange}
                    placeholder='Enter... '
                />
                <button type='submit'>Submit</button>
            </form>

            <div style={{

            }}>
                <table border={1} style={{
                    width: '80%',
                    textAlign: "center",
                    margin: "auto",
                    marginTop:"30px"
                    
                }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Content</th>
                            <th>Due date</th>
                            <th>Status</th>
                            <th>Assigned to</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataList.map((item,index) => (
                            <tr key={item.id}>
                                <td>{index+1}</td>
                                <td>{item.input}</td>
                                <td>{item.date}</td>
                                <td>{item.select}</td>
                                <td>{item.otherInput}</td>
                                <td >
                                    <button onChange={(e) => handleEdit(item.id)}style={{
                                        backgroundColor: "#008000",

                                    }}>Edit</button>
                                    <button onClick={() => handleDelete(item.id)}style={{
                                        backgroundColor: "#FF0000",
                                        marginLeft:"30px",
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
