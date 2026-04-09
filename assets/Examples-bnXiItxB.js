import{j as t}from"./index-cdD6OTP0.js";import{C as a}from"./CodeBlock-MWwKXccF.js";const o=[{title:"Bell state",description:"Entangle two qubits, export to QASM, and sample counts.",href:"https://github.com/quantum4j/quantum4j/tree/main/src/main/java/com/quantum4j/examples"},{title:"Teleportation",description:"Run the end-to-end teleportation example from com.quantum4j.examples.teleportation.",href:"https://github.com/quantum4j/quantum4j/tree/main/src/main/java/com/quantum4j/examples"},{title:"QASM round trip",description:"Export/import circuits with strict QASM handling.",href:"https://github.com/quantum4j/quantum4j/tree/main/src/main/java/com/quantum4j/examples"},{title:"Spring Boot",description:"Expose circuits through REST for CI/CD smoke tests.",href:"https://github.com/quantum4j/quantum4j/tree/main/src/main/java/com/quantum4j/examples"}],r=`import com.quantum4j.core.circuit.QuantumCircuit;
import com.quantum4j.core.backend.BackendType;
import com.quantum4j.core.backend.Result;
import com.quantum4j.core.backend.RunOptions;

public class BellExample {
  public static void main(String[] args) {
    QuantumCircuit qc = QuantumCircuit.create(2)
        .h(0)
        .cx(0, 1)
        .measureAll();

    Result r = qc.run(
        RunOptions.withBackend(BackendType.STATEVECTOR)
            .withShots(1000)
    );

    System.out.println(r.getCounts());
  }
}
`,i=`// Shortcut: call the built-in teleportation example
import com.quantum4j.examples.teleportation.TeleportationExample;

TeleportationExample.main(new String[]{});
`,n=`import com.quantum4j.core.circuit.QuantumCircuit;
import com.quantum4j.qasm.QasmExporter;
import com.quantum4j.qasm.QasmImporter;

QuantumCircuit qc = QuantumCircuit.create(2)
    .h(0)
    .cx(0, 1)
    .measureAll();

String qasm = QasmExporter.toQasm(qc);
QuantumCircuit roundTrip = QasmImporter.fromQasm(qasm);

System.out.println(qasm);
System.out.println(roundTrip.drawAscii());
`,s=`import java.util.Map;
import com.quantum4j.core.circuit.QuantumCircuit;
import com.quantum4j.core.backend.BackendType;
import com.quantum4j.core.backend.Result;
import com.quantum4j.core.backend.RunOptions;
import com.quantum4j.qasm.QasmExporter;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class QuantumController {
  @PostMapping("/bell")
  public Map<String, Object> bell() {
    QuantumCircuit qc = QuantumCircuit.create(2)
        .h(0)
        .cx(0, 1)
        .measureAll();

    Result r = qc.run(
        RunOptions.withBackend(BackendType.STATEVECTOR)
            .withShots(512)
    );

    return Map.of(
        "counts", r.getCounts(),
        "qasm", QasmExporter.toQasm(qc)
    );
  }
}
`,u=()=>t.jsx("section",{id:"examples",className:"py-16 sm:py-24 scroll-mt-28",children:t.jsxs("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 space-y-10",children:[t.jsxs("div",{className:"space-y-3 text-center",children:[t.jsx("p",{className:"text-sm font-semibold text-indigo-200",children:"Examples"}),t.jsx("h2",{className:"text-3xl sm:text-4xl font-semibold text-white tracking-tight",children:"Practical, runnable snippets"}),t.jsx("p",{className:"text-neutral-400 max-w-3xl mx-auto",children:"All examples live in com.quantum4j.examples and in the GitHub examples folder. Copy, run, and adapt for CI/CD."})]}),t.jsxs("div",{className:"grid gap-6 lg:grid-cols-2",children:[t.jsx(a,{title:"Bell state",code:r,footnote:"Deterministic statevector backend with 1000 shots."}),t.jsx(a,{title:"Teleportation (from repo)",code:i,footnote:"Call the packaged teleportation example inline."}),t.jsx(a,{title:"QASM round trip",code:n,footnote:"Strict import/export using QasmExporter and QasmImporter."}),t.jsx(a,{title:"Spring Boot endpoint",code:s,footnote:"Expose a REST endpoint that runs and exports QASM."})]}),t.jsx("div",{className:"grid gap-3 sm:grid-cols-2 lg:grid-cols-4",children:o.map(e=>t.jsxs("a",{href:e.href,target:"_blank",rel:"noreferrer",className:"rounded-2xl border border-white/5 bg-white/5 p-4 space-y-1.5 hover:border-white/20 hover:bg-white/10 transition",children:[t.jsx("h3",{className:"text-lg font-semibold text-white",children:e.title}),t.jsx("p",{className:"text-sm text-neutral-400",children:e.description}),t.jsx("span",{className:"text-xs font-semibold text-indigo-200",children:"GitHub example →"})]},e.title))})]})});export{u as default};
