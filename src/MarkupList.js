import { Link } from "react-router-dom";

function MarkupList ({id, name, rating, website, rate, maximumLoan, minDownPayment, term}, editing, deleting) {

    return (
        <div className='info' key={id}>
            <div className='info-bank'>
                <h2>{name}</h2>
                <h3>Rating: {rating}</h3>
                <h3>Website: {website}</h3>
            </div>
            <div className='info-loan'>
                <h4 className='rate'>Interest rate: {rate}%</h4>
                <h4 className='maximumLoan'>Maximum loan: {maximumLoan}$</h4>
                <h4 className='minDownPayment'>Minimum down payment: {minDownPayment}$</h4>
                <h4 className='term'>Loan term: {term} months</h4>
            </div>
            <Link to={`/Loan/${id}`}>
                <button className='link-btn'>Calculate loan</button>
            </Link>
            
            <div className='info-btns'>
                <button className='input-btn' onClick={() => editing(id)}>Edit</button>
                <button className='input-btn' onClick={() => deleting(id)}>Delete</button>
            </div>
        </div>
    )
}

export default MarkupList
  