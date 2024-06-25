import { useState, useEffect } from "react";
import { Modal } from "../Modal";
import { useAccounts } from "../../context/AccountContext";

export function ModifyAccountModal({ isOpen, onClose, account }) {
  const [accountModified, setAccountModified] = useState({
    codigo: "",
    nombre: "",
    tipo: "",
  });

  useEffect(() => {
    setAccountModified({
      id: account.id,
      codigo: account.codigo,
      nombre: account.nombre,
      tipo: account.tipo,
    });
  }, [account]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountModified({ ...accountModified, [name]: value });
  };

  const { updateAccount } = useAccounts();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAccount(
      accountModified.id,
      accountModified.codigo,
      accountModified.nombre,
      accountModified.tipo
    );

    onClose();
  };

  return (
    <Modal isOpen={isOpen} isClose={onClose}>
      <h3>Modificar Cuenta</h3>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          className="input-data"
          value={accountModified.nombre}
          onChange={handleChange}
        />
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          className="input-data"
          value={accountModified.tipo}
          onChange={handleChange}
        >
          <option value="Acreedor">Acreedor</option>
          <option value="Deudor">Deudor</option>
        </select>
        <div className="buttons-container">
          <input type="submit" value="Modificar" />
        </div>
      </form>
    </Modal>
  );
}
