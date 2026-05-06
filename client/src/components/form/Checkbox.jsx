const Checkbox = (props) => {
  return (
    <div className='form-check'>
      <input
        type='checkbox'
        className='form-check-input'
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label htmlFor={props.name} className='form-check-label'>
        {props.title}
      </label>
    </div>
  )
}

export default Checkbox
