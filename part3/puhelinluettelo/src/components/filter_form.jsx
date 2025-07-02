
const FilterForm = ({handler, filter}) => {
  return (
    <>
    <form>
      filter contacts by name <input onChange={handler} value={filter}/>
    </form>
    </>
  )
}

export default FilterForm
