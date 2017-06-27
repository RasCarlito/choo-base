import html from 'choo/html'

export default (emit, todo) => {
  return html`
    <div class="card todos-show">
      ${printContent(todo.content)}
      <div class="card-footer">
        <button class="card-footer-item button is-white" onclick=${edit}>
          Edit
        </button>
        <button class="card-footer-item button is-white" onclick=${remove}>
          Delete
        </button>
      </div>
    </div>
  `

  function edit () {
    emit('todos:edit', todo)
  }

  function remove () {
    emit('todos:delete', todo)
  }

  function printContent (content) {
    if (!content) {
      return html`
        <div class="card-content todos-empty">
          <i class="fa fa-frown-o"></i>
          <span>It's empty...</span>
        </div>
      `
    }

    return html`
      <div class="card-content">
        <p class="title">
          <em>${todo.content}</em>
        </p>
      </div>
    `
  }
}
