all: clean js

clean:
	rm wetpaint.*.js

js:
	cat src/atk.js > wetpaint.atk.js

	cat src/atk.js > wetpaint.js

	java -Xmx64m -jar lib/google-compiler/compiler-20100616.jar --js wetpaint.atk.js > wetpaint.atk.min.js
	java -Xmx64m -jar lib/google-compiler/compiler-20100616.jar --js wetpaint.js > wetpaint.min.js