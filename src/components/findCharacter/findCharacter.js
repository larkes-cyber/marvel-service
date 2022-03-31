import './findCharacter.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import useGetData from '../../services/getData';
<<<<<<< HEAD

=======
import { useState } from "react";
import { Link } from 'react-router-dom';
>>>>>>> a21f197a961a7c7e1422e55bd14c3040f9de0a59



const Error = () => (
    <ErrorMessage name='name'>
        {
            () => <h1 className='error'>Validation error</h1>
        }
    </ErrorMessage>
)

const FindCharacter = () => {

    const {getCharacterByName} = useGetData()

    const [name,setName] = useState(null);

    const getChar = async(value) => {
        console.log(1231234)
        return await getCharacterByName(value).then(res => res)
    } 
<<<<<<< HEAD

    const validationIsSuccessfuly = (data) => {

        

    }

=======
//'TENEBROUS'
>>>>>>> a21f197a961a7c7e1422e55bd14c3040f9de0a59
    return (

        <div>
            <Formik
                initialValues={{
                    name:""
                }}
                validationSchema = {yup.object({
                        name:yup.string()
                                .required("Validation error")       
                    })
                }

       
                onSubmit = {async(values, { setSubmitting })=>{

                    setSubmitting(true);

<<<<<<< HEAD
                    const someNum = await checkChar(values.name)

                     if ( !(await someNum) )  return  false


                   
                    
                    
                     
=======
                    const someNum = await getChar(values.name)

                    if(await !someNum) return

                    await setName(someNum.name)
>>>>>>> a21f197a961a7c7e1422e55bd14c3040f9de0a59
                    
                }}
            >
               {
                   ({isSubmitting, errors, touched}) => (
                       <Form id='form'>
                         <label htmlFor="name" id='labelName'>Or find a character by name:</label>
                         <Field type="text" id='name' name="name" placeholder="Enter name"/>
                        
                         <button className='button button__main sumbit' type='submit' disabled={isSubmitting}  ><div className="inner">Find</div></button>

                            {
                                name ? (
                                    <div className='isSuccess'>
                                        <p className='isSuccessText'>There is! Visit {name} page?</p>
                                        <Link to={`/comics/char:${name}`}>
                                             <button className='button button__main sumbit inject' type='submit' disabled={isSubmitting}  ><div className="inner">TO PAGE</div></button>
                                        </Link>
                                    </div>
                                ) : null
                            }
                         
                        <Error/>
                         {/* {errors.request && touched.name ? <h1 className='error'>The character was not found. Check the name and try again</h1> : null}   */}
                       </Form>
                   )
               } 
            </Formik>
        </div>
    )
}

export default FindCharacter;