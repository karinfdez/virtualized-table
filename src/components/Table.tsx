// Table built using tanstack table
import { useReactTable, ColumnDef, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import {Spinner} from './Spinner'

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
};

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
	const [data, setData] = useState<Product[]>([])
	const [isFetchingMore, setIsFetchingMore] = useState(false);  //To control if data is being fetch
	const [hasMore, setHasMore] = useState(true);   //To control is the API got to the final data
	const [showNoMore, setShowNoMore] = useState(false);  //To show "no more data to load" message

	const PAGE_LIMIT = 50

	const fetchElements = async () => {
		try {
			if (isFetchingMore || !hasMore) return;  //Dont execute another fetch if there is currently a request happening or there is no more data
			setIsFetchingMore(true);  
			const result = await fetch(`https://dummyjson.com/products?limit=${PAGE_LIMIT}&skip=${data.length}`) //using skip to always get the next data in the pagination, skiping the one used already
			if(!result.ok) throw new Error('There was an error fetching products')
			const finaData = await result.json()
			if(finaData.products.length === 0) {
				setHasMore(false); // no more data, avoid making requests continuously
			}else{
				// Simulating that data gets a few seconds to bet fetch
				setTimeout(() => {
					setData((prev) => [...prev, ...finaData.products]);
					
			}, 400)
			}	
		} catch(error:any) {
			setError(error.message)
		}finally{
			setTimeout(() => {
				setIsFetchingMore(false); 
			}, 400)
		}
	}
	
// Initial load
	useEffect(() => {
		const fetchInitial = async () => {
			setLoading(true);
			const result = await fetch(`https://dummyjson.com/products?limit=${PAGE_LIMIT}&skip=0`);
			const json = await result.json();
			// To simulate that data takes time to be fetch
			setTimeout(() => {
					setData(json.products);
					setLoading(false);
			}, 500)
		};
		fetchInitial();
	}, []);

	useEffect(() => {
		// If no more data, activate state for 3 seconds to show div
  if (!hasMore) {
    setShowNoMore(true);
    const timer = setTimeout(() => setShowNoMore(false), 3000); // hide after 3s
    return () => clearTimeout(timer);
  }
}, [hasMore]);

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
							style={{ height: "700px" }}
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
								TableBody: (props) => <tbody {...props} />
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
							endReached={() => {
    						fetchElements();
  						}}
						/>
				</table>

				{isFetchingMore && (
					<div className="flex justify-center items-center py-4">
						<div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
						<span className="ml-2 text-sm text-indigo-600">Loading more...</span>
					</div>
				)}
				
				{/* No more data is being fetch and there is no more data left in the API */}
				{ !isFetchingMore && showNoMore && (
					<div className="flex justify-center items-center py-4">
						<span className="ml-2 text-sm text-indigo-600">No more data to load</span>
					</div>
				)}
			</div>}
			{loading && data.length === 0 && (
				<Spinner
					color="#4F46E5"  
					loading={loading}
				/>
			)}
			{error && <div className="text-red-500 font-medium">{error}</div>}
		</>
  )

}