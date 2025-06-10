# Miscellaneous Tasks

## Update Footer Section

- [x] Update the footer to display:
    - [x] The text `manta.digital` (lowercase, as shown)
    - [x] The name `Erik Corkran`
    - [x] Copyright symbol (©) if appropriate for MIT license
    - [x] Add 'MIT' as a link to the official license: [MIT License](https://opensource.org/licenses/MIT)
- [x] Add version tag in the footer:
    - [x] Display `manta.digital Templates, v0.5.0` or similar version string

### Success Criteria
- [x] Footer displays all required information in a clear and visually consistent manner
- [x] 'MIT' links to the official license
- [x] Version string is present and accurate
- [x] All text is styled to match the rest of the site

```tsx
// Example (pseudo-code for layout)
<footer>
  <span>manta.digital</span>
  <span>© Erik Corkran</span>
  <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT</a>
  <span>manta.digital Templates, v0.5.0</span>
</footer>
```
