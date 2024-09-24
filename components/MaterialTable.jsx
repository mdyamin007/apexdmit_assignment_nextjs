import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const data = [
    {
      items: "Item one",
      store: "Dummy store",
      runners_name: "Alex Mershel",
      amount: "1000",
      card_no: "82716",
      transcaction_date: "01/08/2024",
    },
    {
      items: "Item one",
      store: "Dummy store",
      runners_name: "Alex Mershel",
      amount: "1000",
      card_no: "82716",
      transcaction_date: "01/08/2024",
    },
    {
      items: "Item one",
      store: "Dummy store",
      runners_name: "Alex Mershel",
      amount: "1000",
      card_no: "82716",
      transcaction_date: "01/08/2024",
    },
    {
      items: "Item one",
      store: "Dummy store",
      runners_name: "Alex Mershel",
      amount: "1000",
      card_no: "82716",
      transcaction_date: "01/08/2024",
    },
  ]
  
function MaterialTable() {
    return (
        <Table className="border text-center border-white border-separate border-spacing-y-0 border-spacing-x-1">
        <TableHeader>
            <TableRow className="bg-[#2563EB99] hover:bg-[#2563EB99]">
            <TableHead className="text-white text-center">ITEMS</TableHead>
            <TableHead className="text-white text-center">STORE</TableHead>
            <TableHead className="text-white text-center">Runner's Name</TableHead>
            <TableHead className="text-white text-center">Amount</TableHead>
            <TableHead className="text-white text-center">CARD NO.</TableHead>
            <TableHead className="text-white text-center">TRANSACTION DATE</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((obj, index) => (
            <TableRow key={index} className="even:bg-white odd:bg-[#2563EB1A]">
                <TableCell className="font-medium">{obj.items}</TableCell>
                <TableCell>{obj.store}</TableCell>
                <TableCell>{obj.runners_name}</TableCell>
                <TableCell>{obj.amount}</TableCell>
                <TableCell>{obj.card_no}</TableCell>
                <TableCell>{obj.transcaction_date}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    );
}

export default MaterialTable;
