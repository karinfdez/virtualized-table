// Table built using tanstack table
import { useReactTable, ColumnDef, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { useEffect, useState, CSSProperties } from "react";
import {Spinner} from './Spinner'
type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const mockData: Product[] = [
    { id: 1, title: "iPhone 9", price: 549, category: "smartphones" },
    { id: 2, title: "Samsung Galaxy S9", price: 499, category: "smartphones" },
    { id: 3, title: "MacBook Pro", price: 1749, category: "laptops" },
    { id: 4, title: "Dell XPS 13", price: 1299, category: "laptops" },
		{ id: 5, title: "iPhone 13", price: 900, category: "smartphones" },
		{ id: 6, title: "iPhone 16", price: 1200, category: "smartphones" },
];

 // columns definition
    const columns: ColumnDef<Product>[] = [
        {
            header: "ID",
            accessorKey: "id",
        },
        {
            header: "Title",
            accessorKey: "title",
        },
        {
            header: "Price",
            accessorKey: "price",
        },
        {
            header: "Category",
            accessorKey: "category",
        },
    ];


export const Table = () => {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [data, setData] = useState([])

	const PAGE_LIMIT = 50

		useEffect(() => {

			const fetchElements = async () => {
				try {
					setLoading(true)
					const result = await fetch(`https://dummyjson.com/products?limit=${PAGE_LIMIT}`)
					if(!result.ok) throw new Error('There was an error fetching products')
					const finaData = await result.json()
					  setTimeout(() => {
							setData(finaData.products);
							setLoading(false); // ✅ only stop loading when data is set
    				}, 800); //Added timeout to show spinner a little longer
				} catch(error:any) {
					setError(error.message)
				}
			}
			fetchElements()
		}, [])

    const options = {
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
   	}

   const table = useReactTable(options)

   return (
		<>
			{data && data.length > 0 && <div className="overflow-x-auto shadow-lg rounded-lg w-full max-w-4xl">
				<table className="w-full border-collapse text-sm text-left">
						<thead className="bg-indigo-100 text-indigo-700">
								{table.getHeaderGroups().map((hg) => (
								<tr key={hg.id}>
										{hg.headers.map((header) => (
										<th className="px-4 py-3 border-b font-semibold" key={header.id}>
												{flexRender(header.column.columnDef.header, header.getContext())}
										</th>
										))}
								</tr>
								))}
						</thead>
						<tbody>
								{table.getRowModel().rows.map((row) => (
								<tr 
										className="hover:bg-gray-100 transition-colors"
										key={row.id}>
										{row.getVisibleCells().map((cell) => (
												<td key={cell.id} className="px-4 py-2 border-b">
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
										))}
								</tr>
								))}
						</tbody>
				</table>
			</div>}
			{loading && (
				<Spinner
					color="#4F46E5"   // Indigo
					loading={loading}
				/>
			)}
			{error && <div className="text-red-500 font-medium">{error}</div>}
		</>
  
  )

}