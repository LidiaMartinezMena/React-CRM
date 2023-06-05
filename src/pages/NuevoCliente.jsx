//UseNavigate: si el usuario presiona en un botón podemos volver a otra página
import {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../data/clientes'

//Para mandar el formulario
export async function action({request}) {
  const formData =  await request.formData()
  
  const datos= Object.fromEntries(formData)

//Validar campo email
  const email = formData.get('email')


  //Validación
  const errores = []
  if(Object.values(datos).includes('')) {
      errores.push('Todos los campos son obligatorios')
  }

  //Email validation
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!regex.test(email)){
    errores.push('El email no es válido')
  }


  //Devolver los errores

  if(Object.keys(errores).length){
    return errores
  }
 
  
  await agregarCliente(datos)
  return redirect('/')
}


function NuevoCliente() {

  const navigate = useNavigate()

  const errores = useActionData()

console.log(errores)
  return (
    <>
     <h1 className="font-black text-4xl text-orange-900"> Nuevo cliente </h1>
      <p className="mt-3"> Llena todos los campos para registrar un nuevo cliente</p>

      <div className="flex justify-end">
          <button className="bg-orange-800 text-white px-3 py-1 font-bold uppercase rounded-md"
          onClick={() => navigate('/')}
          >
            Volver
          </button>
      </div>
      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        
      {errores?.length && errores.map( ( error, i ) => <Error key={i}>{error}</Error> )}
        
        <Form
          method='post'
          noValidate
        >
            <Formulario />

            <input 
              type='submit'
              className='mt-5 w-full bg-orange-800 p-3 uppercase font-bold text-white text-lg rounded-md'
              value="Registrar cliente"
            />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente
