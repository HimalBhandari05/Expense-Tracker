import React , {useState , useEffect} from "react";



function ExpenseDetail(){
    
    // useState(()=>{
    //     const fetch
    // } ,[])

    return (
        <div className="min-h-screen bg-slate-50 p-3 sm:p-5 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                
                <div className="bg-white rounded-3xl shadow-sm border p-6 lg:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                Expenses
                            </h1>
                            <p className="text-gray-600">Manage and track your spending</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700 transition-colors">
                                Import
                            </button>
                            <button className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-2xl hover:bg-emerald-700 transition-colors">
                                Export
                            </button>
                            <button className="px-5 py-2.5 bg-violet-600 text-white font-medium rounded-2xl hover:bg-violet-700 transition-colors">
                                Add Expense
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    <div className="lg:col-span-8 bg-white rounded-3xl shadow-sm border p-6 lg:p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Filter Options</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Date Range
                                </label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                    <option>Last 30 days</option>
                                    <option>Last 7 days</option>
                                    <option>Last 90 days</option>
                                    <option>Custom range</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Category
                                </label>
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                    <option>All categories</option>
                                    <option>Food & Dining</option>
                                    <option>Transportation</option>
                                    <option>Shopping</option>
                                    <option>Entertainment</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Search
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Search transactions..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-sm p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Total Expenses</p>
                                    <p className="text-3xl font-bold mt-1">127</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <span className="text-xl">📊</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl shadow-sm p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-orange-100 text-sm font-medium">Pending</p>
                                    <p className="text-3xl font-bold mt-1">23</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <span className="text-xl">⏳</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl shadow-sm p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium">This Month</p>
                                    <p className="text-3xl font-bold mt-1">$1,234</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <span className="text-xl">📅</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-sm p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-violet-100 text-sm font-medium">Total Amount</p>
                                    <p className="text-3xl font-bold mt-1">$124,565</p>
                                </div>
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <span className="text-xl">💰</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
                    <div className="px-6 py-6 lg:px-8 lg:py-8 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
                            <span className="text-sm text-gray-500">Last updated 2 min ago</span>
                        </div>
                    </div>
                    
                    <div className="hidden lg:block">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Transaction ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Description</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#TXN001</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">Sep 22, 2024</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">Downtown Bistro Lunch</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                Food
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">$45.50</td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-3">
                                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#TXN002</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">Sep 21, 2024</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">Ride to Airport</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                                                Transport
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">$32.80</td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-3">
                                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#TXN003</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">Sep 20, 2024</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">Office Supplies Bundle</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-violet-100 text-violet-800 rounded-full">
                                                Business
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">$89.99</td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-3">
                                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#TXN004</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">Sep 19, 2024</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">Monthly Gym Membership</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                                                Health
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">$75.00</td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-3">
                                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                                                <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="lg:hidden p-4 space-y-4">
                        <div className="bg-gray-50 rounded-2xl p-4 border">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">#TXN001</h3>
                                    <p className="text-gray-600 text-sm">Downtown Bistro Lunch</p>
                                    <p className="text-gray-500 text-xs mt-1">Sep 22, 2024</p>
                                </div>
                                <span className="text-lg font-bold text-gray-900">$45.50</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                    Food
                                </span>
                                <div className="flex space-x-4">
                                    <button className="text-blue-600 text-sm font-medium">Edit</button>
                                    <button className="text-red-600 text-sm font-medium">Delete</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 border">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">#TXN002</h3>
                                    <p className="text-gray-600 text-sm">Ride to Airport</p>
                                    <p className="text-gray-500 text-xs mt-1">Sep 21, 2024</p>
                                </div>
                                <span className="text-lg font-bold text-gray-900">$32.80</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="inline-flex px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">
                                    Transport
                                </span>
                                <div className="flex space-x-4">
                                    <button className="text-blue-600 text-sm font-medium">Edit</button>
                                    <button className="text-red-600 text-sm font-medium">Delete</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 border">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">#TXN003</h3>
                                    <p className="text-gray-600 text-sm">Office Supplies Bundle</p>
                                    <p className="text-gray-500 text-xs mt-1">Sep 20, 2024</p>
                                </div>
                                <span className="text-lg font-bold text-gray-900">$89.99</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="inline-flex px-3 py-1 text-xs font-medium bg-violet-100 text-violet-800 rounded-full">
                                    Business
                                </span>
                                <div className="flex space-x-4">
                                    <button className="text-blue-600 text-sm font-medium">Edit</button>
                                    <button className="text-red-600 text-sm font-medium">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseDetail;