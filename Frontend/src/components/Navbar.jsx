import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import axios from 'axios'


const API_KEY = "http://127.0.0.1:8000/api/expenses/";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isData, setisData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_KEY);
                setisData(response.data)
                console.log(response.data)
            } catch (error) {
                console.log("Error occured")
            }
        }
        fetchData();

    }, [])

    const profileOpen = () => {
        setIsOpen((prev) => {
            return !prev
        })
    }

    return (
        <div className="flex px-16 justify-between w-full h-16 items-center bg-cyan-100 font-medium shadow-md">
            <h1 className="font-bold text-2xl text-cyan-900">Expense Tracker</h1>
            <div id="Login-drop-down" className="relative">
                <button
                    onClick={profileOpen}
                    className="p-2 rounded-full hover:bg-cyan-200 transition"
                >
                    <CgProfile size={28} className="text-cyan-800" />
                </button>
                {
                    isOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
                            <button className="px-4 py-2 text-left hover:bg-cyan-100">Profile</button>
                            <button className="px-4 py-2 text-left hover:bg-cyan-100">Logout</button>
                            <button className="px-4 py-2 text-left hover:bg-cyan-100">Documentation</button>
                        </div>
                    )
                }

                {isData ? <pre>{JSON.stringify(isData, null, 2)}</pre> : <span>No data</span>}
            </div>
        </div>
    )
}

export default Navbar;
