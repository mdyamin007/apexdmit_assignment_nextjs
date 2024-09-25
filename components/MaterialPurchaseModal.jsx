import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { z } from "zod"
import { useCreateMaterialPurchaseMutation } from '@/lib/features/material/materialApiSlice';
import { useToast } from '@/hooks/use-toast';

const materialPurchaseSchema = z.object({
  material_purchase: z.array(
    z.object({
      line_item_name: z.string().min(1, "Item name is required"),
      store: z.string().min(1, "Store name is required"),
      runners_name: z.string().min(1, "Runner's name is required"),
      amount: z.number().min(0, "Amount should be a positive number"),
      card_number: z.string().length(5, "Card number must be 5 digits"),
      transaction_date: z.string().refine((dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime()); 
      }, {
        message: "Invalid date, must be a valid date",
      }),
    })
  ),
})

const MaterialPurchaseModal = ({ openAddModal, setOpenAddModal }) => {

  const [rows, setRows] = useState([
    { line_item_name: "", store: "", runners_name: "", amount: "", card_number: "", transaction_date: "" },
  ])

  const [errors, setErrors] = useState([])

  const { toast } = useToast()
  const [createMaterialPurchase, { isLoading, isError }] = useCreateMaterialPurchaseMutation();

  const addRow = () => {
    setRows([...rows, { line_item_name: "", store: "", runners_name: "", amount: "", card_number: "", transaction_date: "" }])
  }

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index))
  }

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows]
    updatedRows[index][field] = value
    setRows(updatedRows)
  }

  const handleKeyPress = (event, index, field) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault()
      const nextField = getNextField(field)
      if (nextField) {
        document.querySelector(`#input-${index}-${nextField}`).focus()
      }
    }
  }

  const getNextField = (field) => {
    const fields = ["line_item_name", "store", "runners_name", "amount", "card_number", "transaction_date"]
    const currentIndex = fields.indexOf(field)
    return fields[currentIndex + 1] || null
  }

  const handleSave = async () => {
    function convertDateToMMDDYYYY(dateString) {
      const [year, month, day] = dateString.split("-")
      return `${month}-${day}-${year}`
    }

    const formData = {
      material_purchase: rows.map((row) => ({
        line_item_name: row.line_item_name,
        store: row.store,
        runners_name: row.runners_name,
        amount: parseFloat(row.amount),
        card_number: row.card_number,
        transaction_date: convertDateToMMDDYYYY(row.transaction_date),
      })),
    }

    console.log(formData);

    const validation = materialPurchaseSchema.safeParse(formData)

    if (!validation.success) {
      setErrors(validation.error.errors)
      console.log(validation.error.errors)
      return;
    } else {
      console.log("Valid data:", validation.data)
      setErrors([]) 
    }

    try {
      const response = await createMaterialPurchase(formData).unwrap(); 
      console.log(response);
      toast({
        description: "Material Purchase Saved Successfully",
      })
      console.log(response);
      setOpenAddModal(false); // Close modal on success
    } catch (err) {
      toast({
        title: "Error",
        description: err.data.status_message,
      })
      console.error("Error creating material purchase:", err);
    }
  }

  return (
    <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
      <DialogContent className="sm:max-w-[1200px] max-h-screen overflow-auto">
        <DialogHeader className="bg-[#2563EB] py-5 text-white">
          <DialogTitle className="text-center">Material Purchase</DialogTitle>
        </DialogHeader>
        <div className="px-8 pt-8">
          <table className="table-auto w-full border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">ITEMS</th>
                <th className="border border-gray-300 p-2">STORE</th>
                <th className="border border-gray-300 p-2">Runner&apos;s Name</th>
                <th className="border border-gray-300 p-2">AMOUNT</th>
                <th className="border border-gray-300 p-2">CARD NO.</th>
                <th className="border border-gray-300 p-2">TRANSACTION DATE</th>
                <th className="bg-white p-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {/* ITEM Field */}
                  <td className="border border-gray-300 p-2">
                    <Input
                      id={`input-${index}-line_item_name`}
                      autoFocus={index === 0}
                      value={row.line_item_name}
                      onChange={(e) => handleInputChange(index, "line_item_name", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "line_item_name")}
                      placeholder="Item"
                    />
                  </td>
                  {/* STORE Field */}
                  <td className="border border-gray-300 p-2">
                    <Input
                      id={`input-${index}-store`}
                      value={row.store}
                      onChange={(e) => handleInputChange(index, "store", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "store")}
                      placeholder="Store"
                    />
                  </td>
                  {/* Runner's Name */}
                  <td className="border border-gray-300 p-2">
                    <Input
                      id={`input-${index}-runners_name`}
                      value={row.runners_name}
                      onChange={(e) => handleInputChange(index, "runners_name", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "runners_name")}
                      placeholder="Runner's Name"
                    />
                  </td>
                  {/* AMOUNT */}
                  <td className="border border-gray-300 p-2">
                    <Input
                      id={`input-${index}-amount`}
                      type="number"
                      value={row.amount}
                      onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "amount")}
                      placeholder="Amount"
                    />
                  </td>
                  {/* CARD NO */}
                  <td className="border border-gray-300 p-2">
                    <Input
                      id={`input-${index}-card_number`}
                      value={row.card_number}
                      onChange={(e) => handleInputChange(index, "card_number", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "card_number")}
                      placeholder="Card No."
                    />
                  </td>
                  {/* TRANSACTION DATE */}
                  <td className="border border-gray-300 p-2">
                    <Input
                      id={`input-${index}-transaction_date`}
                      type="date"
                      value={row.transaction_date}
                      onChange={(e) => handleInputChange(index, "transaction_date", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "transaction_date")}
                    />
                  </td>
                  {/* DELETE BUTTON */}
                  <td className="p-2 text-center">
                    <Button className="bg-white text-gray-700 hover:bg-white shadow-none" onClick={() => deleteRow(index)}>
                      <TrashIcon height={25} width={25} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mr-[4.5rem] border-b shadow-sm">
            <Button onClick={addRow} className="w-10 h-10 p-0 rounded-full flex items-center justify-center mr-8 my-2 bg-[#2563EB]">
              <PlusIcon height={25} width={25} />
            </Button>
          </div>
          <div className="flex justify-end mr-[4.5rem] mt-4 mb-2">
            <Button className="mr-8 my-2 px-12 py-6 bg-[#2563EB]" onClick={handleSave}>Save</Button>
          </div>

          {/* Display errors */}
          {errors.length > 0 && (
            <div className="mt-4 text-red-500">
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error.path.join(" -> ")}: {error.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="bg-[#2563EB] text-white px-4 py-2 rounded-lg rounded-t-none mt-4"></div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialPurchaseModal;
