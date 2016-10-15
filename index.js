const fs = require("fs");
const glob = require("glob");

class ViewManager {
	constructor() {
		this.compiler = v => v;
		this.renderer = () => {};
		this.views = {};
	}

	compile(compiler) {
		this.compiler = compiler;
	}

	render(renderer) {
		this.renderer = renderer;
	}

	add(pattern) {
		const paths = glob.sync(pattern);

		paths.map(p => fs.readFileSync(p, "utf8"))
			.map(this.compiler)
			.forEach((v, i) => {
				this.views[paths[i]] = v;
			});
	}

	engine() {
		return (filePath, options, callback) => {
			try {
				const view = this.views[filePath];
				callback(null, this.renderer(view, options));
			} catch(err) {
				callback(err);
			}
		};
	}
};

module.exports = ViewManager;
