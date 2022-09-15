export default {
  path: '/{{ name }}',
  name: '{{ name }}',
  component: () => import('./{{ name }}.vue'),
  children: []
}