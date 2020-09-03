# Future Improvements

On schema types, use the { $ref: #/definitions/<typename> } to find the referenced types - rather than having to record them explicitly.  This means we won't know if it's a reference to a schema type or an enum type though.

On schema types, if an example is given, then you don't have to provide a validTestCase.

On schema types, you don't need to provide any invalidTestCases.  This is most useful when you're providing custom formatters or pattern matching and you want to be sure that certain values are not passing the validation.  It has some value in the core schema type where it's critical that they validate correctly.  It's not particularly useful for application-specific schema types which tend to be compound objects anyway.
