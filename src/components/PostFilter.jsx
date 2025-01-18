import PropTypes from "prop-types"

export function PostFilter({
  fields = [],
  filterBy,
  value,
  onChange,
  onFilterByChange,
}) {
  return (
    <div>
      <select
        name="filter-by"
        id="filter-by"
        value={filterBy}
        onChange={(e) => {
          onFilterByChange(e.target.value)
        }}
      >
        {fields.map((field) => (
          <option value={field} key={field}>
            {field}
          </option>
        ))}
      </select>

      <label htmlFor={`filter-by`}>{filterBy}: </label>
      <input
        type="text"
        name={`filter-by`}
        id={`filter-by`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

PostFilter.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterBy: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilterByChange: PropTypes.func.isRequired,
}
