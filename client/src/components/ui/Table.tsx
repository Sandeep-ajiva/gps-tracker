"use client";

import React from "react";

interface Column {
    header: string;
    accessor: string | ((row: any) => React.ReactNode);
    className?: string;
}

interface TableProps {
    columns: Column[];
    data: any[];
    loading?: boolean;
    onRowClick?: (row: any) => void;
}

export default function Table({ columns, data, loading, onRowClick }: TableProps) {
    if (loading) {
        return <div className="p-8 text-center text-gray-500 animate-pulse">Loading data...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="p-8 text-center text-gray-500">No records found.</div>;
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className={`px-6 py-4 ${col.className || ""}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {data.map((row, rowIdx) => (
                        <tr
                            key={rowIdx}
                            onClick={() => onRowClick && onRowClick(row)}
                            className={onRowClick ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""}
                        >
                            {columns.map((col, colIdx) => (
                                <td key={colIdx} className="px-6 py-4 font-medium text-gray-900">
                                    {typeof col.accessor === "function"
                                        ? col.accessor(row)
                                        : row[col.accessor]
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
