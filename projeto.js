document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-tarefa');
    const input = document.getElementById('nova-tarefa');
    const lista = document.getElementById('lista-tarefas');
    const totalEl = document.getElementById('total-tarefas');
    const pendentesEl = document.getElementById('pendentes-tarefas');
    const concluidasEl = document.getElementById('concluidas-tarefas');

    function updateCounters() {
        const tarefas = lista.querySelectorAll('li');
        const pendentes = lista.querySelectorAll('li.pendente').length;
        const concluidas = lista.querySelectorAll('li.concluída').length;
        totalEl.textContent = tarefas.length;
        pendentesEl.textContent = pendentes;
        concluidasEl.textContent = concluidas;
    }

    function createTarefa(text, status = 'pendente') {
        const li = document.createElement('li');
        li.className = status;
        li.innerHTML = `
            ${text}
            <span>
                <button>${status === 'concluída' ? '↩' : '✔'}</button>
                <button>🗑</button>
            </span>
        `;
        const markBtn = li.querySelector('button:first-child');
        const deleteBtn = li.querySelector('button:last-child');

        // Mark as done or undone
        markBtn.addEventListener('click', () => {
            if (li.className === 'pendente') {
                li.className = 'concluída';
                markBtn.textContent = '↩';
                li.style.textDecoration = 'line-through';
            } else {
                li.className = 'pendente';
                markBtn.textContent = '✔';
                li.style.textDecoration = '';
            }
            updateCounters();
        });

        // Delete
        deleteBtn.addEventListener('click', () => {
            li.remove();
            updateCounters();
        });
        return li;
    }

    // Add new tarefa
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            lista.appendChild(createTarefa(text));
            input.value = '';
            updateCounters();
        }
    });

    // Attach events to existing tarefas
    lista.querySelectorAll('li').forEach(li => {
        const [markBtn, deleteBtn] = li.querySelectorAll('button');
        if (markBtn) {
            markBtn.addEventListener('click', () => {
                if (li.className === 'pendente') {
                    li.className = 'concluída';
                    markBtn.textContent = '↩';
                    li.style.textDecoration = 'line-through';
                } else {
                    li.className = 'pendente';
                    markBtn.textContent = '✔';
                    li.style.textDecoration = '';
                }
                updateCounters();
            });
        }
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                li.remove();
                updateCounters();
            });
        }
    });

    const navItems = document.querySelectorAll('nav ul li');

    navItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            let filter = item.textContent.trim();
            lista.querySelectorAll('li').forEach(li => {
                if (filter === 'Todas') {
                    li.style.display = '';
                } else if (filter === 'Pendentes') {
                    li.style.display = li.className === 'pendente' ? '' : 'none';
                } else if (filter === 'Concluídas') {
                    li.style.display = li.className === 'concluída' ? '' : 'none';
                }
            });
        });
    });

    updateCounters();
});