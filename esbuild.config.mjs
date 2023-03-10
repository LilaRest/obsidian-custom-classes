import esbuild from "esbuild";
import process from "process";
import builtins from 'builtin-modules';

const banner =
	`/*
THIS FILE IS AUTOMATICALLY GENERATED BY ESBUILD
To browse sources, please visit the repository of this plugin : https://github.com/LilaRest/obsidian-custom-classes
*/
`;

const prod = (process.argv[2] === 'production');

esbuild.build({
	banner: {
		js: banner,
	},
	entryPoints: {
		main: 'src/main.ts',
		styles: 'src/styles.css',
		manifest: "./manifest.json"
	},
	bundle: true,
	external: [
		'obsidian',
		'electron',
		'@codemirror/autocomplete',
		'@codemirror/collab',
		'@codemirror/commands',
		'@codemirror/language',
		'@codemirror/lint',
		'@codemirror/search',
		'@codemirror/state',
		'@codemirror/view',
		'@lezer/common',
		'@lezer/highlight',
		'@lezer/lr',
		...builtins],
	format: 'cjs',
	watch: !prod,
	target: 'es2018',
	logLevel: "info",
	sourcemap: prod ? false : 'inline',
	treeShaking: true,
	outdir: prod ? 'dist' : 'dev-vault/.obsidian/plugins/custom-classes',
	loader: { ".json": "copy" },
}).catch(() => process.exit(1));
