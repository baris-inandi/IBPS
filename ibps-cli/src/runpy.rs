use rustpython::vm::{self, Settings};

pub fn runpy(code: &str, filename: &str) -> vm::PyResult {
    let mut settings = Settings::default();
    settings.optimize = 0;
    settings.quiet = false;
    settings.argv = std::env::args().collect();

    vm::Interpreter::with_init(settings, |vm| {
        vm.add_frozen(rustpython_pylib::FROZEN_STDLIB)
    })
    .enter(|pyvm| {
        let scope = pyvm.new_scope_with_builtins();

        let code_obj = pyvm
            .compile(code, vm::compiler::Mode::Exec, String::from(filename))
            .map_err(
                |err: vm::source_code::LocatedError<vm::compiler::CompileErrorType>| {
                    pyvm.new_syntax_error(&err, Some(filename))
                },
            )?;

        let x = pyvm.run_code_obj(code_obj, scope);
        match &x {
            Ok(_) => {}
            Err(e) => {
                eprintln!("Traceback:");
                for i in e.args().to_vec() {
                    eprintln!(
                        "{}",
                        match i.str(pyvm) {
                            Ok(s) => s.to_string(),
                            Err(_) => String::from("Unknown error"),
                        }
                    );
                }
            }
        };
        return x;
    })
}
