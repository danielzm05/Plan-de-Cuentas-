import { Modal } from "../Modal";
import { useState } from "react";
import { useAccounts } from "../../context/AccountContext";

export function AddAccountModal({ isOpen, onClose }) {
  const [accountInfo, setAccountInfo] = useState({
    codigo: "",
    nombre: "",
    tipo: "Acreedor",
  });

  const { createAccount } = useAccounts();

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createAccount(accountInfo.codigo, accountInfo.nombre, accountInfo.tipo);
    setAccountInfo({
      codigo: "",
      nombre: "",
      tipo: "Acreedor",
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Nueva Cuenta</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="codigo">Código:</label>
        <input
          type="number"
          name="codigo"
          id="codigo"
          className="input-data"
          onChange={handleInputChange}
        />
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          className="input-data"
          onChange={handleInputChange}
        />
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          className="input-data"
          onChange={handleInputChange}
          text=""
        >
          <option value="Acreedor" defaultValue>
            Acreedor
          </option>
          <option value="Deudor">Deudor</option>
        </select>
        <div className="buttons-container">
          <input type="submit" value="Crear Cuenta" />
        </div>
      </form>
    </Modal>
  );
}
