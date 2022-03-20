import './findCharacter.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const FindCharacter = () => {
    return (
        <Formik
            initialValues={{
                name:"Enter name"
            }}
            validationSchema = {yup.object({
                    name:yup.string()
                            .required("Validation error")       
                })
            }
        >
            <form className='form'>
                <label htmlFor="name" id='labelName'>Or find a character by name:</label>
                <Field type="text" id='name' name="name"/>
                <button className='button button__main sumbit' type='sumbit'><div className="inner">Find</div></button>
            </form>         
        </Formik>
    )
}

export default FindCharacter;