import './findCharacter.css';

const FindCharacter = () => {
    return (
        <form className='form'>
            <label htmlFor="name" id='labelName'>Or find a character by name:</label>
            <input type="name" id='name' value="Enter name"/>
            <button className='button button__main sumbit' type='sumbit'><div className="inner">Find</div></button>
        </form>
    )
}

export default FindCharacter;