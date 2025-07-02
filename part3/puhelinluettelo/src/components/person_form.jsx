
const PersonForm = ({addFunc, name, number, numHandler, nameHandler}) => {
  return (
    <>
    <form onSubmit={addFunc}>
      <div>
        name: <input onChange={nameHandler} value={name}/>
        number: <input onChange={numHandler} value={number}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

export default PersonForm
