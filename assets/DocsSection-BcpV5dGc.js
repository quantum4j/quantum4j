import{j as t}from"./index-cdD6OTP0.js";import{C as e}from"./CodeBlock-MWwKXccF.js";const i=`import com.quantum4j.core.circuit.QuantumCircuit;
import com.quantum4j.core.backend.BackendType;
import com.quantum4j.core.backend.Result;
import com.quantum4j.core.backend.RunOptions;

public class BellQuickStart {
  public static void main(String[] args) {
    QuantumCircuit qc = QuantumCircuit.create(2)
        .h(0)
        .cx(0, 1)
        .measureAll();

    Result result = qc.run(
        RunOptions.withBackend(BackendType.STATEVECTOR)
            .withShots(512)
    );

    System.out.println(result.getCounts());
  }
}
`,a=`import com.quantum4j.core.circuit.QuantumCircuit;
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
`,o=`import com.quantum4j.core.circuit.QuantumCircuit;
import com.quantum4j.core.backend.BackendType;
import com.quantum4j.core.backend.RunOptions;

QuantumCircuit qc = QuantumCircuit.create(1)
    .h(0)
    .measureAll();

// Deterministic simulator
qc.run(RunOptions.withBackend(BackendType.STATEVECTOR));

// Target IonQ hardware (configured via backend settings)
qc.run(RunOptions.withBackend(BackendType.IONQ));
`,n=`import java.util.Map;
import com.quantum4j.core.circuit.QuantumCircuit;
import com.quantum4j.core.backend.BackendType;
import com.quantum4j.core.backend.RunOptions;
import com.quantum4j.core.backend.Result;
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
            .withShots(256)
    );

    return Map.of(
        "counts", r.getCounts(),
        "qasm", QasmExporter.toQasm(qc)
    );
  }
}
`,s=[{title:"Installation",body:"Add com.quantum4j:quantum4j:1.3.2 via Maven or Gradle. Java 17+."},{title:"Transpiler pipeline",body:"Configure PassManager to optimize, schedule, and map circuits before execution."},{title:"Hardware (IonQ)",body:"Switch RunOptions backend to IonQ when credentials/connectors are configured."},{title:"QASM import/export",body:"Use QasmExporter/QasmImporter for strict OpenQASM interop."},{title:"Spring Boot",body:"Wrap QuantumCircuit execution behind REST endpoints for CI-friendly services."},{title:"Examples",body:"All runnable samples live in com.quantum4j.examples and the GitHub examples folder."}],u=()=>t.jsx("section",{id:"docs",className:"py-16 sm:py-24 scroll-mt-28",children:t.jsxs("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 space-y-10",children:[t.jsxs("div",{className:"space-y-3 text-center",children:[t.jsx("p",{className:"text-sm font-semibold text-indigo-200",children:"Documentation"}),t.jsx("h2",{className:"text-3xl sm:text-4xl font-semibold text-white tracking-tight",children:"Build, transpile, and ship"}),t.jsx("p",{className:"text-neutral-400 max-w-3xl mx-auto",children:"Installation, quick start, QASM import/export, backends (Statevector + IonQ), Spring Boot integration, and transpiler pipeline—plus links to Javadoc and GitHub examples."})]}),t.jsxs("div",{className:"grid gap-6 lg:grid-cols-2",children:[t.jsx(e,{title:"Quick start (Bell)",code:i,footnote:"Deterministic statevector backend with 512 shots."}),t.jsx(e,{title:"QASM import/export",code:a,footnote:"Strict IO via QasmExporter and QasmImporter."})]}),t.jsxs("div",{className:"grid gap-6 lg:grid-cols-2",children:[t.jsx(e,{title:"Backends",code:o,footnote:"Swap between statevector and IonQ connectors via RunOptions."}),t.jsx(e,{title:"Spring Boot integration",code:n,footnote:"Expose circuit execution over REST with Javadoc-ready types."})]}),t.jsxs("div",{className:"rounded-2xl border border-white/5 bg-white/5 p-6 space-y-4",children:[t.jsx("h3",{className:"text-lg font-semibold text-white",children:"Topics at a glance"}),t.jsx("div",{className:"grid gap-3 sm:grid-cols-2",children:s.map(r=>t.jsxs("div",{className:"rounded-xl border border-white/5 bg-neutral-950/70 p-4 space-y-2",children:[t.jsx("p",{className:"text-xs font-semibold uppercase tracking-[0.14em] text-indigo-200",children:r.title}),t.jsx("p",{className:"text-sm text-neutral-400 leading-relaxed",children:r.body})]},r.title))}),t.jsxs("div",{className:"flex flex-wrap gap-3",children:[t.jsx("a",{href:"https://quantum4j.github.io/quantum4j/apidocs/",target:"_blank",rel:"noreferrer",className:"inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/20 transition",children:"Full JavaDocs"}),t.jsx("a",{href:"https://github.com/quantum4j/quantum4j/tree/main/src/main/java/com/quantum4j/examples",target:"_blank",rel:"noreferrer",className:"inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10 transition",children:"GitHub Examples folder"})]})]})]})});export{u as default};
