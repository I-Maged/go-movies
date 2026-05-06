const TextArea = (props) => {
  return (
    <div className='mb-3'>
      <label htmlFor={props.name} className='form-label'>
        {props.title}
      </label>
      <textarea
        className='form-cotrol'
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        rows={props.rows}
      ></textarea>
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  )
}

export default TextArea
