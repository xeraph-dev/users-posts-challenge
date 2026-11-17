# Users and Posts Challenge

Aplicación web para la gestión de usuarios y publicaciones.

## 🚀 Cómo ejecutarlo

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/xeraphdev/users-posts-challenge](https://github.com/xeraphdev/users-posts-challenge)
   cd users-posts-challenge
   ```

2. **Instalar dependencias (usando pnpm):**
   ```bash
   pnpm install
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   pnpm dev
   ```

---

## 🛠️ Decisiones técnicas

* **UI (`shadcn/ui`):** Se eligió porque construir los componentes desde cero habría tomado mucho más tiempo.
* **TanStack Suite:** Seleccionada por su gran integración con `shadcn/ui`.
  * **TanStack Query:** Para facilitar la gestión de estados asíncronos (`isLoading`, `isFetching`, etc.).
  * **TanStack Router:** Por su interesante enfoque de enrutamiento basado en archivos.

---

## ⏳ ¿Qué haría con más tiempo?

* **Diseño responsive:** Adaptar la interfaz para garantizar una correcta visualización y experiencia de usuario en dispositivos móviles y tablets.
* **Mejor arquitectura:** Reestructurar el proyecto para mejorar la escalabilidad y facilitar el testing (por ejemplo, aislar las llamadas a la API en servicios dedicados y usar `axios` en lugar de `fetch`).
* **Testing:** Completar las pruebas unitarias y de integración para componentes clave como `CreatePost`.
* **CRUD completo:** Implementar la creación, edición y eliminación tanto de usuarios como de posts (actualmente solo se permite crearlos).

---

## 🤖 Uso de la IA

La Inteligencia Artificial se utilizó de forma complementaria durante el desarrollo para:
* **Creación de este documento**: Este mismo documento fue redactado con la IA, proporcionándole toda la información detallada sobre qué debía contener.
* **Búsqueda de documentación:** Encontrar ejemplos y referencias de la suite de TanStack de forma ágil, ya que no siempre están explícitos en su documentación oficial.
* **Configuración de tests:** Acelerar el setup inicial del entorno de pruebas.
* **Depuración:** Identificar el origen de errores con mensajes poco claros.
