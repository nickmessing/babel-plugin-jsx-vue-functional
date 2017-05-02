module.exports = babel => {
  const t = babel.types

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      Program (path) {
        path.traverse({
          'ExportNamedDeclaration' (path) {
            if (!t.isVariableDeclaration(path.node.declaration) ||
              path.node.declaration.declarations.length !== 1 ||
              !t.isVariableDeclarator(path.node.declaration.declarations[0]) ||
              !t.isArrowFunctionExpression(path.node.declaration.declarations[0].init)) {
              return
            }
            const jsxChecker = {
              hasJsx: false
            }
            path.traverse({
              JSXElement () {
                this.hasJsx = true
              }
            }, jsxChecker)
            if (!jsxChecker.hasJsx) {
              return
            }
            const name = path.node.declaration.declarations[0].id.name
            const params = [t.identifier('h'), ...path.node.declaration.declarations[0].init.params]
            const body = path.node.declaration.declarations[0].init.body
            path.replaceWith(
              t.exportNamedDeclaration(
                t.variableDeclaration(
                  'const',
                  [
                    t.variableDeclarator(
                      t.identifier(name),
                      t.objectExpression(
                        [
                          t.objectProperty(
                            t.identifier('functional'),
                            t.booleanLiteral(true)
                          ),
                          t.objectProperty(
                            t.identifier('render'),
                            t.arrowFunctionExpression(params, body)
                          )
                        ]
                      )
                    )
                  ]
                ),
                []
              )
            )
          }
        })
      }
    }
  }
}
