import "./table.scss";
import SORT_FIELD from "../../../../utils/constants/sort_field";

const Table = ({ onSort, sortField, sortDirection, data, onRowSelect }) => (
    <table className="table">
        <thead>
            <tr>
                {Object.keys(SORT_FIELD).map(field => (   
                    <th key={field} onClick={() => onSort(SORT_FIELD[field])}>
                        {field} {sortField === SORT_FIELD[field] ? <small>{sortDirection}</small> : null}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map(item => {
                const { id, phone, firstName, lastName, email } = item;

                return (
                    <tr key={id + phone} onClick={() => onRowSelect(item)}>
                        <td>{id}</td>
                        <td>{firstName}</td>
                        <td>{lastName}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);

export default Table;
