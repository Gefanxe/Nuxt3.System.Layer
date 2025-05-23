export const conf = `
[request_definition]
r = sub, obj, act

[role_definition]
g = _, _

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = (r.sub == "coderapid" || (keyMatch(r.sub, p.sub) || g(r.sub, p.sub))) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`;
