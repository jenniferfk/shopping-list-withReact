import {useState} from "react";
import jsPDF from "jspdf";
import './App.css';

function App() {
  const [item,setItem]=useState("");
  const [itemsList, setItemsList] = useState([]);

  function onSubmit(event){
    event.preventDefault();
    if (item.trim() !== "") {
      setItemsList([...itemsList, item]);
      setItem(""); 
    }

  }
  function removeItem(index) {
    const updatedItems = [...itemsList];
    updatedItems.splice(index, 1);
    setItemsList(updatedItems);
  }
  function generatePDF() {
    const doc = new jsPDF();
    const content = itemsList.map((item, index) => `${index + 1}. ${item}`).join("\n");
    doc.text(content, 10, 10);
    doc.save("shopping-list.pdf");
  }

  
 return(
  <div>
    <h1>Shopping List</h1>
    <div className="pdfdownload"><button onClick={generatePDF} className="downloadbttn">Download List</button></div>
    <div className="listcontainer">
      <h2>List</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="items"
          placeholder="Add an item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button type="submit">
          ADD
        </button>
      </form>
      <ul>
          {itemsList.map((listItem, index) => (
            <li key={index}>
              {listItem}
              <button className="removeitem" onClick={() => removeItem(index)}>x</button>
            </li>
          ))}
        </ul>
    </div>
  </div>
 );
}

export default App;
