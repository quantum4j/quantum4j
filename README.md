# Quantum4J: A Modern Java Quantum Computing SDK  
**Lightweight • Extensible • JVM-Native • Engineering-First**

![Build](https://github.com/quantum4j/quantum4j/actions/workflows/maven.yml/badge.svg)
![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)
![Java](https://img.shields.io/badge/Java-17%2B-blue)
![Maven Central](https://img.shields.io/maven-central/v/com.quantum4j/quantum4j.svg)
![Stars](https://img.shields.io/github/stars/quantum4j/quantum4j.svg?style=flat)

---

⚠️ **Official Quantum4J Repository**

This is the **ONLY official Quantum4J project**.  
Any other repositories using the Quantum4J name or branding are **independent forks and not affiliated**.

⚠️ Security Notice

Quantum4J does NOT distribute executables (.exe), including inside ZIP archives.
Official artifacts are ONLY published via Maven Central and this repository:
https://github.com/quantum4j/quantum4j


---

Quantum4J is a modern, modular, and fully JVM-native quantum computing SDK designed to bring  
**Quantum Software Engineering (QSE)** into the Java ecosystem.

While most quantum tools today focus on research workflows inside notebooks, Quantum4J is built for the  
**next phase of quantum evolution** — integrating quantum logic into real software systems, microservices,  
enterprise pipelines, CI/CD, and cloud environments.

Quantum4J is:

- A **clean quantum circuit API** for engineers  
- A **deterministic statevector simulator**  
- A **QASM-compatible** execution model  
- A **JVM-first architecture** ready for enterprise use  
- A **foundation** for future quantum engineering tools (testing, orchestration, cloud execution)

Quantum4J is **100% open-source**, **dependency-free**, and currently runs circuits up to ~**25 qubits** (memory bound).

---

# 🚀 Why Quantum4J?

Modern quantum development is dominated by research tools.  
Quantum4J instead focuses on **engineering requirements**:

- Deterministic, testable simulation  
- Clean modular API and package structure  
- Version-controlled quantum circuits in normal code repos  
- Backend-agnostic QASM export/import  
- JVM-native integration (Java, Kotlin, Scala)  
- Ready for microservices, cloud deployment, and CI/CD pipelines  
- A foundation for future orchestration, debugging, and test frameworks

Quantum4J aims to become the **engineering layer** of the quantum software stack — the place where quantum meets real-world systems.

---

# ✨ Features

## ✔ Full Standard Gate Set
- **Single-qubit:** X, Y, Z, H, S, T  
- **Rotation gates:** RX(θ), RY(θ), RZ(θ)  
- **Controlled gates:** CX, CZ, CH  
- **Two-qubit:** SWAP, iSWAP  
- **Three-qubit:** CCX (Toffoli)

## ✔ State-Vector Simulator
- High-performance N-qubit statevector backend  
- Supports 1-, 2-, and 3-qubit unitaries  
- Custom `Complex` math implementation  
- Deterministic and sample-based execution modes

## ✔ Measurements
- `measure(q, c)`  
- `measureAll()`  
- Classical registers  
- Deterministic or sampled measurement behavior

## ✔ OpenQASM Import/Export
- Strict OpenQASM 2.0 importer (whitespace/comments tolerant)  
- Deterministic OpenQASM 2.0 exporter  
- Round-trip tests (import → export → import) for correctness

## ✔ Transpiler & Optimizations
- PassManager with composable passes  
- Swap, CX→CZ, U3 decomposition  
- Rotation fusion, CX cancellation, gate inversion, commutation  
- Default transpiler pipeline for safe round-tripping

## ✔ Extensible Backends (Pluggable)
- Built-in: `STATEVECTOR` simulator  
- Hardware hook via `BackendFactory` (IonQ example)  
- Future-ready slots for density/stabilizer/GPU/hardware backends

## ✔ Circuit Visualization
- ASCII renderer (deterministic, multi-qubit routing)  
- SVG renderer for publication-quality diagrams

## ✔ Example Circuits + Test Suite
- Bell, GHZ, Toffoli, SWAP/iSWAP, rotations, QFT, Deutsch, Grover, teleportation  
- Extensive JUnit 5 suite for gates, QASM, transpiler, visualization, backend layers

---

# 📦 Installation

## Maven (Maven Central)
```xml
<dependency>
    <groupId>com.quantum4j</groupId>
    <artifactId>quantum4j</artifactId>
    <version>1.3.2</version>
</dependency>
```

## Gradle
```gradle
implementation 'com.quantum4j:quantum4j:1.3.2'
```

## From Source
```bash
git clone https://github.com/quantum4j/quantum4j.git
mvn test
```

---

# 🚀 Quick Start Example

## 🧪 Hello Quantum (minimal example)

```java
QuantumCircuit qc = QuantumCircuit.create(1).h(0).measureAll();
Result r = qc.run(RunOptions.withBackend(BackendType.STATEVECTOR).withShots(200));
System.out.println(r.getCounts());  // roughly {0≈100, 1≈100}
```

This is the smallest runnable example to get started quickly.

➡️ See `/src/main/java/com/quantum4j/examples` for 25+ runnable demos.

### Create a Bell State

```java
import com.quantum4j.core.circuit.QuantumCircuit;
import com.quantum4j.core.backend.*;

public class BellState {
    public static void main(String[] args) {
        QuantumCircuit qc = QuantumCircuit.create(2)
                .h(0)
                .cx(0, 1)
                .measureAll();

        Result r = qc.run(RunOptions.withBackend(BackendType.STATEVECTOR).withShots(1000));
        System.out.println(r.getCounts());
    }
}
```

**Sample Output**
```
{00=502, 11=498}
```

---

# 🔺 Toffoli (CCX) Example

```java
QuantumCircuit qc = QuantumCircuit.create(3)
    .x(0)
    .x(1)
    .ccx(0, 1, 2)
    .measureAll();

Result r = qc.run(RunOptions.withBackend(BackendType.STATEVECTOR).withShots(1000));
System.out.println(r.getCounts());
```

Expected:
```
{111=1000}
```

---

# 📤 Export to QASM

```java
QuantumCircuit qc = QuantumCircuit.create(2)
    .h(0)
    .cx(0, 1)
    .measureAll();

String qasm = QasmExporter.toQasm(qc);
System.out.println(qasm);
```

Output:
```
OPENQASM 2.0;
include "qelib1.inc";
qreg q[2];
creg c[2];

h q[0];
cx q[0], q[1];
measure q[0] -> c[0];
measure q[1] -> c[1];
```

---

# 🔗 Using Quantum4J in Spring Boot / REST APIs

Quantum4J is designed to fit naturally into backend systems and microservices.

```java
@RestController
@RequestMapping("/api/quantum")
public class QuantumController {

    @GetMapping("/bell")
    public Map<String, Integer> bell() {
        QuantumCircuit qc = QuantumCircuit.create(2)
                .h(0)
                .cx(0, 1)
                .measureAll();

        Result result = qc.run(RunOptions.withBackend(BackendType.STATEVECTOR).withShots(1000));
        return result.getCounts();
    }
}
```
---
# Running on Real Quantum Hardware

Quantum4J supports pluggable backends. The default is STATEVECTOR simulation. Hardware backends are optional and only used if you register them manually (IonQ example below):

1) Register a hardware backend:
```java
BackendFactory.register(
    BackendType.HARDWARE,
    new IonQBackend(System.getenv("IONQ_API_KEY"))
);
```

2) Execute using the hardware backend:
```java
Result r = circuit.run(RunOptions.withBackend(BackendType.HARDWARE).withShots(500));
System.out.println(r.getCounts());
```

3) IonQ authentication
- Set env var `IONQ_API_KEY` to your IonQ API key.
- The backend submits OpenQASM 2.0 to IonQ's REST API.

4) Cost and noise notice
- Real hardware runs may incur cloud costs.
- Hardware results are subject to device noise and queue times.

5) Example
- See `com.quantum4j.examples.GroverHardwareExample` for an end-to-end IonQ submission sample.

## Feature Highlights (recap)
- OpenQASM 2.0 import/export (strict importer, deterministic exporter).
- Pluggable backends: STATEVECTOR simulator built-in; optional hardware via BackendFactory (IonQ example).


---

# 🧱 Architecture Overview (Code-Level)

| Module     | Description                                       |
|------------|---------------------------------------------------|
| `circuit/` | Circuit objects, instructions, fluent builder     |
| `gates/`   | Gate definitions (1, 2, 3 qubit)                  |
| `math/`    | Complex arithmetic + state-vector implementation  |
| `backend/` | Execution backend (statevector + pluggable HW)    |
| `qasm/`    | QASM importer/exporter                            |
| `visualization/` | ASCII + SVG circuit rendering               |
| `transpile/` | PassManager + decomposition/optimization passes |
| `examples/`| Ready-to-run examples                             |
| `tests/`   | JUnit 5 test suite                                |

---

# 🧪 Test Suite

Run tests:
```bash
mvn test
```

---

# ⚡ Performance Notes

25 qubits is the upper bound on typical JVM memory for the statevector backend.

---

# 🗺️ Roadmap

- Noise models & density matrix backend  
- Stabilizer backend  
- GPU/offloaded simulation  
- Additional compiler passes and schedulers  
- Expanded hardware connectors (IBM, Braket, Rigetti)  
- Cloud execution services  

---

# 🧑‍💻 Contributing

We welcome:
- Pull requests  
- Issue reports  
- New gate implementations  
- Example circuits  
- Academic extensions  

Please use the **Google/IntelliJ Java style guide**.

---

# 📄 License

Apache License 2.0  
Copyright (c) 2025 Vijaya Anand Geddada

---

# 🏢 Maintainer

**Vijay Anand Geddada**  
Creator – Quantum4J  
20+ years enterprise engineering leadership  
Cloud-native • Microservices • Java • Spring • Quantum

# ⭐ Star the Repo

If you find this useful: https://github.com/quantum4j/quantum4j

---

