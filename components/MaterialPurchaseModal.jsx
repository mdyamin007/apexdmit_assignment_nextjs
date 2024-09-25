import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';

const MaterialPurchaseModal = ({ openAddModal, setOpenAddModal }) => {

  const [rows, setRows] = useState([
    { item: "", store: "", runnerName: "", amount: "", cardNo: "", date: "" },
  ])

  // Function to handle adding a row
  const addRow = () => {
    setRows([...rows, { item: "", store: "", runnerName: "", amount: "", cardNo: "", date: "" }])
  }

  // Function to handle row deletion
  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index))
  }

  // Function to handle input change
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows]
    updatedRows[index][field] = value
    setRows(updatedRows)
  }

  // Function to handle key press for Enter or Tab
  const handleKeyPress = (event, index, field) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault()
      const nextField = getNextField(field)
      if (nextField) {
        document.querySelector(`#input-${index}-${nextField}`).focus()
      }
    }
  }

  // Function to get the next field based on current field
  const getNextField = (field) => {
    const fields = ["item", "store", "runnerName", "amount", "cardNo", "date"]
    const currentIndex = fields.indexOf(field)
    return fields[currentIndex + 1] || null
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
                <th className="border border-gray-300 p-2">Runner's Name</th>
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
                      id={`input-${index}-item`}
                      autoFocus={index === 0}
                      value={row.item}
                      onChange={(e) => handleInputChange(index, "item", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "item")}
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
                      id={`input-${index}-runnerName`}
                      value={row.runnerName}
                      onChange={(e) => handleInputChange(index, "runnerName", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "runnerName")}
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
                      id={`input-${index}-cardNo`}
                      value={row.cardNo}
                      onChange={(e) => handleInputChange(index, "cardNo", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "cardNo")}
                      placeholder="Card No."
                    />
                  </td>
                  {/* TRANSACTION DATE */}
                  <td className="border border-gray-300 p-2">
                    <Input
                      id={`input-${index}-date`}
                      type="date"
                      value={row.date}
                      onChange={(e) => handleInputChange(index, "date", e.target.value)}
                      onKeyDown={(e) => handleKeyPress(e, index, "date")}
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
          <div className="flex justify-end mr-[4.5rem] border-b shadow-md">
            <Button onClick={addRow} className="w-10 h-10 p-0 rounded-full flex items-center justify-center mr-8 my-2 bg-[#2563EB]">
              <PlusIcon height={25} width={25} />
            </Button>
          </div>
          <div className="flex justify-end mr-[4.5rem] mt-4 mb-2">
              <Button className="mr-8 my-2 px-12 py-6 bg-[#2563EB] ">Save</Button>
          </div>
        </div>
        <div className="bg-[#2563EB] text-white px-4 py-2 rounded-lg rounded-t-none mt-4"></div>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialPurchaseModal;
