// Table built using tanstack table
import { useReactTable, ColumnDef, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { useEffect, useState, CSSProperties } from "react";
import { TableVirtuoso } from "react-virtuoso";

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
						size: 80
        },
        {
            header: "Title",
            accessorKey: "title",
						size: 300
        },
        {
            header: "Price",
            accessorKey: "price",
						size: 100
        },
        {
            header: "Category",
            accessorKey: "category",
						size: 200
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
				<table className="w-full border-collapse text-sm text-left table-fixed">
						{/* This gives virtualization. Allowing to load 1000 of data, but only showing certain amount in the DOM */}
						<TableVirtuoso
							style={{ height: "500px" }}
							data={data}
							// Virtuoso attaches in props the style, children, ref
							// These are the skeleton tags: table, thead, tbody, tr
							components={{
								Table: (props) => (
									<table 
										{...props} 
										className="w-full border-collapse text-sm text-left table-fixed" 
									/>
								),
								TableHead: (props) => <thead {...props} className="bg-indigo-100 text-indigo-700 text-center" />,
								TableRow: (props) => <tr {...props} className="hover:bg-gray-100 transition-colors text-center" />,
								TableBody: (props) => <tbody {...props} />,
							}}
							// Tells Virtuoso what should render inside <thead>
							fixedHeaderContent={() => (
								<tr>
									{/* Call table.getHeaderGroups() from TanStack to loop over headers and render <th> cells. */}
									{table.getHeaderGroups().map((hg) =>
										hg.headers.map((header) => (
											<th 
												key={header.id} 
												className="px-4 py-3 border-b font-semibold"
												style={{ width: header.column.getSize() }}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
											</th>
										))
									)}
								</tr>
							)}
							// Tells Virtuoso what goes inside each <tr> in <tbody>
							itemContent={(index, product: Product) => {
								const row = table.getRowModel().rows[index]; //Grabbing this row from TanStack
								return row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-4 py-2 border-b">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								));
							}}
						/>
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