import { useState } from "react";
import styles from "./Price.module.css"
interface productPrice {
    iva: {name: string, valor: number};
}
const Price = () => {
    const [total, setTotal] = useState<number | null>(3);
    const [formData, setFormData] = useState<productPrice>({
        iva: {name: "Seleccionar Iva", valor: 0},
      });
    const ivaOptions = [
        {name: "Inscripto", valor: 21},
        {name:"Consumidor Final", valor: 21},
        {name:"Exento", valor: 21}
    ]
    const productTotal = () => {
        const totalPrice = formData.iva.valor * formData.iva.valor
        setTotal(totalPrice)
    }
    return(
        <div className={styles.container}>
            <select
            >
                <option value="" disabled>
                Selecciona una categoría
                </option>
                {ivaOptions.map((option) => (
                <option key={option.name} value={option.name} >
                    {option.name} {option.valor}
                </option>
                ))}
            </select>
            <span className={styles.total}>Total: {total}</span>
        </div>
    )
}

export default Price;